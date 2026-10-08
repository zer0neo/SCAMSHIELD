import os
import shutil
from io import BytesIO

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import pytesseract


# Determine Tesseract OCR binary path:
# 1. Environment variable TESSERACT_CMD
# 2. System PATH (via shutil.which)
# 3. Default Windows installer location
tesseract_cmd = os.environ.get("TESSERACT_CMD")
if not tesseract_cmd:
    default_win_path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    which_path = shutil.which("tesseract")
    if which_path:
        tesseract_cmd = which_path
    elif os.path.exists(default_win_path):
        tesseract_cmd = default_win_path
    else:
        tesseract_cmd = "tesseract"

pytesseract.pytesseract.tesseract_cmd = tesseract_cmd


def extract_text_from_image(
    image_data: bytes,
    language: str = "auto"
) -> str:

    image = Image.open(BytesIO(image_data))

    # Convert to grayscale
    image = ImageOps.grayscale(image)

    # Increase contrast
    image = ImageEnhance.Contrast(image).enhance(2.0)

    # Sharpen text
    image = image.filter(ImageFilter.SHARPEN)

    # Upscale screenshot for better OCR
    width, height = image.size
    image = image.resize((width * 2, height * 2))

    # Map language parameter to Tesseract language codes
    lang_lower = (language or "auto").lower()
    if lang_lower in ("auto", "all"):
        target_lang = "eng+hin+kan"
    elif lang_lower in ("english", "en"):
        target_lang = "eng"
    elif lang_lower in ("hindi", "hi"):
        target_lang = "hin"
    elif lang_lower in ("kannada", "kn"):
        target_lang = "kan"
    else:
        target_lang = "eng"

    try:
        text = pytesseract.image_to_string(
            image,
            lang=target_lang,
            config="--psm 6"
        )
    except Exception as e:
        # Fallback to English if combined vernacular traineddata is not installed
        if target_lang != "eng":
            text = pytesseract.image_to_string(
                image,
                lang="eng",
                config="--psm 6"
            )
        else:
            raise e

    return text.strip()