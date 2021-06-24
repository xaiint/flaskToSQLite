import sqlite3

con = sqlite3.connect('database/registros.db')
cur = con.cursor()

#   crearTabla
cur.execute(''' CREATE TABLE alumnos (nombre,apellidoPaterno,apellidoMaterno,numeroCta,estudios)''')
con.commit()
con.close()

print("Tabla creada exitosamente")
