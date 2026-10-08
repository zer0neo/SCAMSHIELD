from io import BytesIO

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import pytesseract


TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH


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

    if language == "auto":
        language = "eng+hin+kan"
    elif language == "english":
        language = "eng"
    elif language == "hindi":
        language = "hin"
    elif language == "kannada":
        language = "kan"

    text = pytesseract.image_to_string(
        image,
        lang=language,
        config="--psm 6"
    )

    return text.strip()