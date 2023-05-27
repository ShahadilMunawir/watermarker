import os
import sys
from PIL import Image

base_image = Image.open(sys.argv[1])
watermark_image = Image.open(sys.argv[2])
output_image_filename = f"{sys.argv[1].split('/')[-1].split('.')[-2]}_watermarked.png"
save_folder_path = os.path.join(os.path.expanduser("~"), "Watermarked_Images")

max_size = (base_image.width // 4, base_image.height // 4)
watermark_image.thumbnail(max_size, Image.ANTIALIAS)

position = (base_image.width - watermark_image.width, base_image.height - watermark_image.height)

result_image = Image.new("RGBA", base_image.size)
result_image.paste(base_image, (0, 0))
result_image.paste(watermark_image, position)

if not os.path.exists(save_folder_path):
    os.makedirs(save_folder_path)

save_path = os.path.join(save_folder_path, output_image_filename)

result_image.save(save_path)
print(f"Saved to {save_path}")