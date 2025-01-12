from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='src')

# Endpoint untuk menyajikan file index.html
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Endpoint untuk file statis di folder 'src' (CSS, JS, dll.)
@app.route('/src/<path:path>')
def serve_src(path):
    return send_from_directory(app.static_folder, path)

# Endpoint untuk file di folder 'img'
@app.route('/img/<path:path>')
def serve_img(path):
    return send_from_directory('img', path)

if __name__ == '__main__':
    app.run(debug=True)
