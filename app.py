# app.py --- SERVER

# dependenciasServer
from flask import *
import sqlite3

app = Flask(__name__)

# variableBase de SQLite
DATABASE = 'resultados.db'

# rutasServer
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sesion")
def sesion():
    return render_template("sesion.html")

@app.route('/nosotros')
def nosotros():
    return render_template("nosotros.html")

@app.route('/juego_2')
def juego_2():
    return render_template("juego_2.html")

@app.route('/videos')
def videos():
    return render_template("videos.html")

@app.route('/contactos')
def contactos():
    return render_template("contactos.html")

@app.route('/juego')
def juego():
    return render_template("juego.html")

if __name__ == '__main__':
    app.run(debug=True)

# llamarBaseDeDatos
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db