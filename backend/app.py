from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# -------- CONEXIÓN A LA BASE DE DATOS --------
def get_connection():
    return psycopg2.connect(
        dbname="elleskiin_db",
        user="postgres",
        password="rema",
        host="localhost",
        port="5432"
    )

# -------- RUTA DE PRUEBA --------
@app.route("/")
def inicio():
    return "Backend Elleskiin funcionando correctamente"

# -------- RECIBIR ASESORÍA --------
@app.route("/asesoria", methods=["POST"])
def recibir_asesoria():
    data = request.get_json()

    nombre = data.get("nombre")
    correo = data.get("correo")
    telefono = data.get("telefono")
    edad = int(data.get("edad") or 0)
    mensaje = data.get("mensaje")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO asesorias (nombre, correo, telefono, edad, mensaje)
        VALUES (%s, %s, %s, %s, %s)
    """, (nombre, correo, telefono, edad, mensaje))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"mensaje": "Asesoría guardada correctamente"}), 200


if __name__ == "__main__":
    app.run(debug=True)
