from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import firebase_admin
from firebase_admin import credentials, firestore, storage

# ===============================
# FIREBASE INIT
# ===============================

cred = credentials.Certificate("firebase-key.json")

firebase_admin.initialize_app(cred, {
    "storageBucket": "shopping-digital-admin-b0b3d.firebasestorage.app"
})

db = firestore.client()
bucket = storage.bucket()

# ===============================
# FASTAPI INIT
# ===============================

app = FastAPI()

# liberar acesso do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# MODELOS
# ===============================

class Loja(BaseModel):
    nome: str
    categoria: str

# ===============================
# ROTAS
# ===============================

@app.get("/")
def home():
    return {"status": "Backend rodando"}

# ===============================
# CRIAR LOJA
# ===============================

@app.post("/lojas")
def criar_loja(loja: Loja):
    doc_ref = db.collection("lojas").document()

    doc_ref.set({
        "nome": loja.nome,
        "categoria": loja.categoria
    })

    return {
        "status": "Loja criada",
        "id": doc_ref.id
    }

# ===============================
# LISTAR LOJAS
# ===============================

@app.get("/lojas")
def listar_lojas():
    lojas = db.collection("lojas").stream()

    resultado = []

    for loja in lojas:
        data = loja.to_dict()
        data["id"] = loja.id
        resultado.append(data)

    return resultado


