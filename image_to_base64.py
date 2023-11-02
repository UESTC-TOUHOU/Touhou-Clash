import base64

img_path = './yacd.png'

with open(img_path, 'rb') as f:
    image_data = f.read()
    base64_data = base64.b64encode(image_data)  # base64编码
    print(base64_data)
    print(type(base64_data))
