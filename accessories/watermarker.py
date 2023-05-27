import sys
from PIL import Image

base_image = Image.open(sys.argv[1])
overlay_image = Image.open(sys.argv[3] + "/accessories/logo.png")
max_size = (base_image.width // 4, base_image.height // 4)
overlay_image.thumbnail(max_size, Image.ANTIALIAS)

position = (base_image.width - overlay_image.width, base_image.height - overlay_image.height)

result_image = Image.new("RGBA", base_image.size)
result_image.paste(base_image, (0, 0))
result_image.paste(overlay_image, position)

result_image.save(f"{sys.argv[4]}/{sys.argv[2]}_watermarked.png")
print(f"{sys.argv[4]}/{sys.argv[2]}_watermarked.png")
print("Save done")