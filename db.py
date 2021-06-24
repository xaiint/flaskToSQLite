import sqlite3
con = sqlite3.connect("registro.db")
print("Base de datos abierta correctamente")

# crearBaseDeDatos
con.execute("CREATE TABLE Alumno (numeroCta TEXT PRIMARY KEY, nombre TEXT NOT NULL, apellidoPaterno TEXT NOT NULL, apellidoMaterno TEXT NOT NULL, nivelAcademico TEXT NOT NULL)")

print("Tabla creada exitosamente")

con.close()