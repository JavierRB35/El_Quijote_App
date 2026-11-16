#!/usr/bin/env python3
"""DC-42: localized helmet editing. Outputs PREVIEW only until visual QA."""
from PIL import Image,ImageDraw,ImageEnhance,ImageFilter,ImageOps
import numpy as np, cv2, json, pathlib, hashlib, os
ROOT=pathlib.Path(__file__).resolve().parents[1]
REF=ROOT/'assets/scenes/_art_direction/dc42_asset_auxiliar_visera.webp'
SRC=Image.open(REF).convert('RGBA')
# manually mapped regions in native image coordinates; four numbers: bbox
CASES={
  "p1_c01_r03_celada_reforzada_post": dict(rect=(590,65,1060,515),metal=(650,65,920,325),brow=(667,150,1038,335),full=(608,58,1050,515),erase=[[(675,80),(880,70),(985,138),(1030,260),(948,494),(837,475),(607,460),(600,326)]], protect=[[(598,323),(810,318),(828,484),(592,489)],[(514,430),(777,420),(873,478),(773,611),(530,601)],[(924,259),(1058,250),(1075,568),(921,592)]]),
  "p1_c02_h01_i01_salida_corral_story": dict(metal=(558,15,622,110),brow=(594,39,655,91),erase=[[(564,54),(586,24),(627,19),(649,42),(648,84),(597,93),(558,108)]],protect=[[(598,61),(670,62),(671,159),(588,147)]]),
  "p1_c02_h02_i01_duda_investidura_story": dict(metal=(895,15,987,150),brow=(959,32,1066,101),erase=[[(911,44),(946,26),(1005,15),(1043,29),(1060,72),(1021,98),(954,113),(896,141)]],protect=[[(958,75),(1111,68),(1118,220),(955,233)]]),
  "p1_c02_h02_i02_resolucion_armarse_story": dict(metal=(341,7,498,238),brow=(456,27,621,111),erase=[[(329,132),(345,35),(400,0),(613,0),(637,76),(610,146),(516,157),(446,200),(352,216)]],sky=[([(445,0),(618,0),(604,55),(541,69),(453,52)],700)],protect=[[(442,99),(664,92),(682,347),(440,340)]]),
  "p1_c02_h03_camino_monologos_story": dict(metal=(408,30,469,134),brow=(454,44,503,80),erase=[],protect=[[(456,84),(530,84),(528,194),(454,200)]]),
  "p1_c02_h03_i01_cronista_hazanas_story": dict(metal=(516,10,648,220),brow=(615,36,756,113),erase=[[(518,97),(549,41),(608,11),(696,14),(740,58),(736,116),(643,141),(559,207),(520,195)]],protect=[[(609,83),(799,79),(813,304),(601,302)]]),
  "p1_c02_h03_i03_dulcinea_sol_story": dict(metal=(141,13,276,224),brow=(245,33,366,111),erase=[[(146,95),(154,22),(190,0),(328,0),(361,36),(351,113),(272,157),(194,234),(147,182)]],sky=[([(245,0),(361,0),(362,66),(310,81),(245,52)],240)],protect=[[(243,78),(453,77),(464,318),(241,308)]]),
  "p1_c02_h04_i01_cansancio_hambre_story": dict(metal=(330,11,449,194),brow=(425,35,528,97),erase=[[(337,67),(385,20),(465,9),(524,35),(538,86),(485,125),(394,160),(337,165)]],protect=[[(397,88),(567,88),(574,277),(390,283)],[(404,55),(559,45),(563,150),(406,135)]]),
  "p1_c02_h05_espera_trompeta_story": dict(metal=(317,43,388,154),brow=(370,55,426,98),erase=[],protect=[[(367,89),(457,88),(456,190),(366,202)]]),
  "p1_c02_h05_i02_cuerno_porquero_story": dict(metal=(116,10,252,215),brow=(209,30,316,103),erase=[[(117,89),(146,17),(198,0),(317,0),(323,63),(304,119),(249,164),(155,214),(118,186)]],sky=[([(220,0),(339,0),(331,59),(278,79),(229,54)],370)],protect=[[(200,77),(451,76),(450,308),(194,303)]]),
}
# template segments manually extracted from source asset:
# metal with aged ridge and flared brim; frontal high cardboard brow
METAL=SRC.crop((0,0,425,624))
BROW=SRC.crop((345,135,739,409))
def src_clipped(im,which):
    out=im.copy(); a=out.getchannel('A');m=Image.new('L',out.size);d=ImageDraw.Draw(m)
    if which=='metal':
        pts=[(0,0),(365,0),(424,90),(408,182),(375,289),(385,386),(315,480),(300,609),(0,623)]
    else:
        pts=[(0,20),(120,0),(270,5),(393,80),(390,215),(260,255),(95,240),(0,155)]
    d.polygon(pts,fill=255);a=Image.composite(a,Image.new('L',a.size,0),m);a=a.filter(ImageFilter.MinFilter(3));out.putalpha(a);return out
METAL=src_clipped(METAL,'metal')
BROW=src_clipped(BROW,'brow')
def roi_poly(shape,pts):
    mask=np.zeros(shape[:2],np.uint8)
    for poly in pts:cv2.fillPoly(mask,[np.array(poly,np.int32)],255)
    return mask
def draw_layer(canvas,frag,rect,mask,protect,brightness=1):
    x0,y0,x1,y1=rect
    w,h=x1-x0,y1-y0
    layer=frag.resize((w,h),Image.Resampling.LANCZOS)
    if brightness!=1:layer=ImageEnhance.Brightness(layer).enhance(brightness)
    # conservative alpha on the applied layer, not on protected original pixels
    sl,st=max(0,x0),max(0,y0); sr,sb=min(canvas.width,x1),min(canvas.height,y1)
    if sl>=sr or st>=sb:return
    layer=layer.crop((sl-x0,st-y0,sr-x0,sb-y0))
    alpha=np.array(layer.getchannel('A'))
    alpha=np.where(protect[st:sb,sl:sr]>0,0,alpha).astype('uint8')
    layer.putalpha(Image.fromarray(alpha))
    patch=Image.alpha_composite(canvas.crop((sl,st,sr,sb)).convert('RGBA'),layer)
    canvas.paste(patch,(sl,st))
    mask[st:sb,sl:sr]=np.maximum(mask[st:sb,sl:sr],(alpha>0).astype('uint8')*255)
def process(idx,item,preview_only=True):
    path=ROOT/item['ruta'];name=item['id']; c=CASES[name]
    orig=Image.open(path).convert('RGB');A=np.asarray(orig).copy()
    protect=roi_poly(A.shape,c.get('protect',[]))
    erase=roi_poly(A.shape,c.get('erase',[]))
    erase[protect>0]=0
    edit=erase.copy()
    if np.any(erase):
        repaired=cv2.inpaint(cv2.cvtColor(A,cv2.COLOR_RGB2BGR),erase,3,cv2.INPAINT_TELEA)
        repaired=cv2.cvtColor(repaired,cv2.COLOR_BGR2RGB)
        initial=np.where(erase[:,:,None]>0,repaired,A)
    else:initial=A.copy()
    # Para puntas de cartón contra el cielo: sustituir solo la región del casco
    # por cielo de la misma altura tomado de una zona despejada del original.
    for polygon,dx in c.get('sky',[]):
        sky=roi_poly(A.shape,[polygon]);sky[protect>0]=0
        yy,xx=np.where(sky>0)
        if yy.size:
            initial[yy,xx]=A[yy,np.clip(xx+dx,0,A.shape[1]-1)]
            edit[yy,xx]=255
    canvas=Image.fromarray(initial,'RGB').convert('RGBA')
    # metal first, cardboard brow second. Cardboard is up in these open-face images
    if 'full' in c:
        draw_layer(canvas,ImageOps.mirror(SRC),c['full'],edit,protect,brightness=c.get('bright',1.0))
    else:
        draw_layer(canvas,METAL,c['metal'],edit,protect,brightness=c.get('bright',1.0))
        draw_layer(canvas,BROW,c['brow'],edit,protect,brightness=c.get('bright',1.0))
    result=np.array(canvas.convert('RGB'))
    result=np.where((edit>0)[:,:,None],result,A)
    # mathematically exact equality outside the change mask
    changed=np.any(result!=A,axis=2)
    outside=int(np.logical_and(changed,edit==0).sum())
    assert outside==0
    dest=ROOT/'dc42_previews'/f'{idx:02d}_{name}.webp'
    dest.parent.mkdir(exist_ok=True)
    Image.fromarray(result).save(dest,'WEBP',lossless=True,method=5)
    x0=min(c['metal'][0],c['brow'][0]); y0=min(c['metal'][1],c['brow'][1]);x1=max(c['metal'][2],c['brow'][2]);y1=max(c['metal'][3],c['brow'][3])
    crop=(max(0,x0-100),max(0,y0-75),min(orig.width,x1+130),min(orig.height,y1+180))
    a=orig.crop(crop);b=Image.fromarray(result).crop(crop)
    width=720
    a.thumbnail((width//2,440));b.thumbnail((width//2,440))
    preview=Image.new('RGB',(a.width+b.width,max(a.height,b.height)),(255,255,255))
    preview.paste(a,(0,0));preview.paste(b,(a.width,0))
    preview.save(ROOT/'dc42_previews'/f'{idx:02d}_{name}_compare.jpg',quality=40)
    return {'id':name,'original':item['ruta'],'preview':str(dest.relative_to(ROOT)),'outside_mask_changed':outside,'changed_pixels':int(changed.sum()),'mask_pixels':int((edit>0).sum()),'size':orig.size,'preview_crop':crop,'original_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'preview_sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'status':'preview_unreviewed'}
def main():
    j=json.loads((ROOT/'docs/AUDITORIA_CELADA_P1_C01_C02_2026-11-16.json').read_text())
    xs=[x for x in j['images'] if x['clasificacion']=='REQUIERE_RETOQUE_SOLO_CELADA'][:10]
    results=[]
    for i,x in enumerate(xs,1):
        results.append(process(i,x))
        print(i,x['id'],'changed',results[-1]['changed_pixels'],'mask',results[-1]['mask_pixels'],flush=True)
    (ROOT/'dc42_previews'/'report.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
if __name__=='__main__':main()

