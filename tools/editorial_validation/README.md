# Validación editorial — herramientas del contrato (encargo §6.3, §8.7)

`validate.py` valida registros del catálogo y paquetes contra los esquemas de `/schemas` y aplica las reglas semánticas del contrato (tipos de pregunta, puertas de licencia, certezas, referencias cruzadas).

## Requisitos

Python 3.11+ y `pip install -r requirements.txt` (solo en local; **los paquetes de terceros nunca se suben al repositorio**, encargo §intro).

## Uso

```bash
# Un registro suelto (puerta 'repo' por defecto: exige licencia verificada + uso de repo)
python tools/editorial_validation/validate.py file tests/contracts/fixtures/valid/question_single.json

# Un registro con la puerta de instalador ('app': no exige permiso de repositorio Git)
python tools/editorial_validation/validate.py file tests/contracts/fixtures/invalid/invalid_media_repo_only.json --gate app

# Un paquete completo con referencias cruzadas
python tools/editorial_validation/validate.py package tests/contracts/fixtures/package_valid.json

# Batería completa (fixtures válidos deben pasar, negativos deben fallar con su código)
python tools/editorial_validation/validate.py suite tests/contracts/fixtures --json tests/contracts/last_validation_report.json
```

## Puertas de licencia

| Puerta | Exige | Uso |
|---|---|---|
| `app` | `license_status=verificada` + `uso_personal_app` | Empaquetado del instalador |
| `repo` | lo anterior + `almacenamiento_repo_git` | Cualquier subida al Git remoto (encargo §4.7.8) |

Un activo puede ser legítimo para el instalador y aun así **prohibido en el repositorio**; la puerta `repo` es siempre la más estricta.
