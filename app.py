# app.py --- SERVER

# dependenciasServer
from flask import *
import sqlite3

app = Flask(__name__)

# rutasServer
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sesion")
def sesion():
    return render_template("sesion.html")

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

# metodosDatabase
@app.route('/guardarInput', methods=['POST'])
def guardarInput():
    con = sqlite3.connect("database/registros.db")
    if request.method == "POST":
        try:
            nombre = request.form["nombre"]
            apellidoPaterno = request.form["apellidoPaterno"]
            apellidoMaterno = request.form["apellidoMaterno"]
            numeroCta = request.form["numeroCta"]
            estudios = request.form["estudios"]

            cur = con.cursor()
            cur.execute("INSERT INTO alumnos (nombre,apellidoPaterno,apellidoMaterno,numeroCta,estudios) values (?,?,?,?,?)",(nombre,apellidoPaterno,apellidoMaterno,numeroCta,estudios))
            con.commit()
            print("Usuario agregado correctamente")
            return redirect(url_for('nosotros'))
        except:
            con.rollback()
            print("El usuario no fue agregado")
            return render_template("404.html")
        finally:
            con.close()

@app.route('/nosotros')
def nosotros():
    con = sqlite3.connect("database/registros.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("SELECT * FROM alumnos")
    row = cur.fetchall()
    return render_template("nosotros.html", filas = row)
    
@app.route('/datos', methods=['POST'])
def datos():
    con = sqlite3.connect("database/registros.db")
    numeroCta =request.form["numeroCta"]
    sql='DELETE FROM alumnos WHERE numeroCta=?'
    cur = con.cursor()
    cur.execute(sql, (numeroCta,))
    con.commit()
    return redirect(url_for('nosotros'))
    print('Exito')


# modoDesarrollo
if __name__ == '__main__':
    app.run(debug=True)
