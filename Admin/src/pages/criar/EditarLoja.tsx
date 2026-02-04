import "./criarloja.css";
import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";


import { storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../services/firebase";
import { serverTimestamp } from "firebase/firestore";


import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs
} from "firebase/firestore";

import { useEffect } from "react";


export default function CriarLoja() {
const [cpfCnpj, setCpfCnpj] = useState<string>("");
const [cpfResponsavel, setCpfResponsavel] = useState<string>("");
const [telefone, setTelefone] = useState<string>("");
const [whatsapp, setWhatsapp] = useState<string>("");

const [cep, setCep] = useState<string>("");
const [rua, setRua] = useState<string>("");
const [bairro, setBairro] = useState<string>("");
const [cidade, setCidade] = useState<string>("");
const [estado, setEstado] = useState<string>("");
const [erroCep, setErroCep] = useState("");


const [tempoPreparo, setTempoPreparo] = useState("00:00");






const [erroCpf, setErroCpf] = useState("");
const [erroEmail, setErroEmail] = useState("");
const [email, setEmail] = useState("");
const [erroCpfCnpj, setErroCpfCnpj] = useState("");




const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

const diasSemana = [
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab",
  "Dom",
];

const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
const [previewPerfil, setPreviewPerfil] = useState("");

const [fotoBanner, setFotoBanner] = useState<File | null>(null);
const [previewBanner, setPreviewBanner] = useState("");

const [fotoCapa, setFotoCapa] = useState<File | null>(null);
const [previewCapa, setPreviewCapa] = useState("");


const [categoria, setCategoria] = useState("");
const [nomeLoja, setNomeLoja] = useState("");
const [nomeOriginal, setNomeOriginal] = useState("");

const [nomeFantasia, setNomeFantasia] = useState("");
const [subcategoria, setSubcategoria] = useState("");
const [descricao, setDescricao] = useState("");

const [razaoSocial, setRazaoSocial] = useState("");
const [nomeResponsavel, setNomeResponsavel] = useState("");

const [numero, setNumero] = useState("");
const [pontoReferencia, setPontoReferencia] = useState("");

const [areaAtendimento, setAreaAtendimento] = useState("");

const [horarioAbertura, setHorarioAbertura] = useState("");
const [horarioFechamento, setHorarioFechamento] = useState("");


const { lojaId } = useParams();
const navigate = useNavigate();


useEffect(() => {
  async function carregarLoja() {
    if (!lojaId) return;

    const snap = await getDoc(doc(db, "lojas", lojaId));

    if (!snap.exists()) return;

    const data = snap.data();

    setNomeLoja(data.nome || "");
    setNomeOriginal(data.nome || "");

    setCategoria(data.categoria || "");

    setCpfCnpj(data.cpfCnpj || "");
    setCpfResponsavel(data.cpfResponsavel || "");
    setTelefone(data.telefone || "");
    setWhatsapp(data.whatsapp || "");
    setEmail(data.email || "");

    setCep(data.endereco?.cep || "");
    setRua(data.endereco?.rua || "");
    setBairro(data.endereco?.bairro || "");
    setCidade(data.endereco?.cidade || "");
    setEstado(data.endereco?.estado || "");

    setDiasSelecionados(data.operacao?.diasFuncionamento || []);
    setTempoPreparo(data.operacao?.tempoPreparo || "00:00");

    setPreviewPerfil(data.imagens?.perfil || "");
    setPreviewBanner(data.imagens?.banner || "");
    setPreviewCapa(data.imagens?.capa || "");

    setNomeFantasia(data.nomeFantasia || "");
setSubcategoria(data.subcategoria || "");
setDescricao(data.descricao || "");

setRazaoSocial(data.razaoSocial || "");
setNomeResponsavel(data.nomeResponsavel || "");

setNumero(data.endereco?.numero || "");
setPontoReferencia(data.endereco?.pontoReferencia || "");

setAreaAtendimento(data.atendimento?.area || "");

setHorarioAbertura(data.operacao?.horarioAbertura || "");
setHorarioFechamento(data.operacao?.horarioFechamento || "");

  }

  carregarLoja();
}, [lojaId]);


  const handleCpfCnpj = (value: string) => {
    let v = value.replace(/\D/g, "");

    // limita tamanho: 11 (CPF) ou 14 (CNPJ)
    v = v.slice(0, 14);

    if (v.length <= 11) {
      // CPF: 000.000.000-00
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // CNPJ: 00.000.000/0000-00
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }

    setCpfCnpj(v);

    const numeros = v.replace(/\D/g, "");

if (numeros.length === 11) {
  setErroCpfCnpj(validarCPF(v) ? "" : "CPF inválido");
} else if (numeros.length === 14) {
  setErroCpfCnpj(validarCNPJ(v) ? "" : "CNPJ inválido");
} else {
  setErroCpfCnpj("");
}

  };

  

 const handleCpfResponsavel = (value: string) => {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 11);

  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  setCpfResponsavel(v);

  if (v.length === 14) {
    setErroCpf(validarCPF(v) ? "" : "CPF inválido");
  } else {
    setErroCpf("");
  }
};


const handleTelefone = (value: string) => {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 11);

  if (v.length > 10) {
    // celular
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
  } else {
    // fixo
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  setTelefone(v);
};

const handleWhatsapp = (value: string) => {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 11);

  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
  } else {
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  setWhatsapp(v);
};


const handleCep = async (value: string) => {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 8);

  if (v.length > 5) {
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
  }

  setCep(v);
  setErroCep("");

  if (v.length === 9) {
    const cepLimpo = v.replace("-", "");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const data = await response.json();

      if (!data.erro) {
        setRua(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setEstado(data.uf || "");
        setErroCep("");
      } else {
        setErroCep("CEP inválido");
        setRua("");
        setBairro("");
        setCidade("");
        setEstado("");
      }
    } catch (error) {
      setErroCep("Erro ao buscar CEP");
    }
  }
};



const handleTempoPreparo = (value: string) => {
  setTempoPreparo(value);
};





const validarCPF = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
    return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10)))
    return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.substring(10, 11));
};

const validarCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros[tamanho - i]) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos[0])) return false;

  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros[tamanho - i]) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  return resultado === Number(digitos[1]);
};


const validarEmail = (value: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(value);
};

const toggleDia = (dia: string) => {
  if (diasSelecionados.includes(dia)) {
    setDiasSelecionados(diasSelecionados.filter(d => d !== dia));
  } else {
    setDiasSelecionados([...diasSelecionados, dia]);
  }
};


const validarFormulario = () => {
  if (!cpfCnpj || erroCpfCnpj) {
    alert("CPF ou CNPJ inválido");
    return false;
  }

  if (!cpfResponsavel || erroCpf) {
    alert("CPF do responsável inválido");
    return false;
  }

  if (!nomeLoja.trim()) {
  alert("Informe o nome da loja");
  return false;
}


  if (!email || erroEmail) {
    alert("Email inválido");
    return false;
  }

  if (!telefone) {
    alert("Telefone é obrigatório");
    return false;
  }

  if (!cep || erroCep) {
  alert("CEP inválido");
  return false;
}


  if (diasSelecionados.length === 0) {
    alert("Selecione dias de funcionamento");
    return false;
  }
  return true;
};


const gerarPreview = (
  file: File,
  setPreview: (url: string) => void
) => {
  const url = URL.createObjectURL(file);
  setPreview(url);

  // libera memória depois
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 10000);
};

const salvarAlteracoes = async () => {
  if (!lojaId) return;


  const nomeBase = nomeLoja
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-")
  .replace(/[^\w-]+/g, "");

const novoLojaId = `${nomeBase}-${Date.now()}`;

const mudouNome = nomeLoja.trim() !== nomeOriginal.trim();

  if (!validarFormulario()) return;

  try {
    let perfilURL = previewPerfil;
    let bannerURL = previewBanner;
    let capaURL = previewCapa;

    /* =====================
       Upload se trocar imagem
    ====================== */

    if (fotoPerfil) {
      const perfilRef = ref(
        storage,
        `lojas/${lojaId}/perfil-${Date.now()}`
      );
      await uploadBytes(perfilRef, fotoPerfil);
      perfilURL = await getDownloadURL(perfilRef);
    }

    if (fotoBanner) {
      const bannerRef = ref(
        storage,
        `lojas/${lojaId}/banner-${Date.now()}`
      );
      await uploadBytes(bannerRef, fotoBanner);
      bannerURL = await getDownloadURL(bannerRef);
    }

    if (fotoCapa) {
      const capaRef = ref(
        storage,
        `lojas/${lojaId}/capa-${Date.now()}`
      );
      await uploadBytes(capaRef, fotoCapa);
      capaURL = await getDownloadURL(capaRef);
    }

    /* =====================
       Atualiza Firestore
    ====================== */

  
const dadosLoja = {
  nome: nomeLoja,
  nomeFantasia,
  categoria,
  subcategoria,
  descricao,

  razaoSocial,
  nomeResponsavel,
  cpfResponsavel,
  cpfCnpj,

  telefone,
  whatsapp,
  email,

  endereco: {
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    pontoReferencia,
  },

  atendimento: {
    area: areaAtendimento,
  },

  operacao: {
    diasFuncionamento: diasSelecionados,
    horarioAbertura,
    horarioFechamento,
    tempoPreparo,
  },

  imagens: {
    perfil: perfilURL,
    banner: bannerURL,
    capa: capaURL,
  },

  atualizadoEm: serverTimestamp(),
};

if (mudouNome) {
  await setDoc(doc(db, "lojas", novoLojaId), dadosLoja);

  // =============================
// Copiar produtos
// =============================
const produtosSnap = await getDocs(
  collection(db, "lojas", lojaId, "produtos")
);

for (const produto of produtosSnap.docs) {
  await setDoc(
    doc(db, "lojas", novoLojaId, "produtos", produto.id),
    produto.data()
  );
}

// =============================
// Copiar pedidos
// =============================
const pedidosSnap = await getDocs(
  collection(db, "lojas", lojaId, "pedidos")
);

for (const pedido of pedidosSnap.docs) {
  await setDoc(
    doc(db, "lojas", novoLojaId, "pedidos", pedido.id),
    pedido.data()
  );
}


  // apaga documento antigo
await deleteDoc(doc(db, "lojas", lojaId));


} else {
  await updateDoc(doc(db, "lojas", lojaId), dadosLoja);
}

   alert("Alterações salvas!");
navigate("/lojas");



  } catch (error) {
    console.error(error);
    alert("Erro ao atualizar loja");
  }
};

  


  return (
    <div className="criar-loja">
      <h1>Editar Loja</h1>

      {/* ================= DADOS BÁSICOS ================= */}
      <section className="card">
        <h2>Dados Básicos</h2>

        <div className="grid">
          <div className="field">
            <label>Nome da loja</label>
           <input
  type="text"
  placeholder="Ex: Mercado Central"
  value={nomeLoja}
  onChange={(e) => setNomeLoja(e.target.value)}
/>

          </div>

          <div className="field">
            <label>Nome fantasia</label>
            <input
  type="text"
  value={nomeFantasia}
  onChange={(e) => setNomeFantasia(e.target.value)}
/>

          </div>

          <div className="field">
            <label>Categoria principal</label>
            <select
  value={categoria}
  onChange={(e) => setCategoria(e.target.value)}
>
  <option value="">Selecione</option>
  <option value="Mercado">Mercado</option>
  <option value="Restaurante">Restaurante</option>
  <option value="Padaria">Padaria</option>
  <option value="Serviços">Serviços</option>
</select>

          </div>

          <div className="field">
            <label>Subcategoria</label>
            <input
  type="text"
  value={subcategoria}
  onChange={(e) => setSubcategoria(e.target.value)}
/>

          </div>
        </div>

        <div className="field">
          <label>Descrição da loja</label>
         <textarea
  value={descricao}
  onChange={(e) => setDescricao(e.target.value)}
/>

        </div>
      </section>

      {/* ================= DADOS LEGAIS ================= */}
      <section className="card">
        <h2>Dados Legais</h2>

        <div className="grid">
          

          <div className="field">
  <label>CPF ou CNPJ</label>
  <input
    type="text"
    value={cpfCnpj}
    onChange={(e) => handleCpfCnpj(e.target.value)}
    placeholder="Digite CPF ou CNPJ"
  />

  {erroCpfCnpj && (
  <small style={{ color: "red" }}>{erroCpfCnpj}</small>
)}

</div>


          <div className="field">
            <label>Razão social</label>
            <input
  type="text"
  value={razaoSocial}
  onChange={(e) => setRazaoSocial(e.target.value)}
/>

          </div>

          <div className="field">
            <label>Nome do responsável</label>
            <input
  type="text"
  value={nomeResponsavel}
  onChange={(e) => setNomeResponsavel(e.target.value)}
/>

          </div>

          <div className="field">
  <label>CPF do responsável</label>
  <input
  type="text"
  value={cpfResponsavel}
  onChange={(e) => handleCpfResponsavel(e.target.value)}
  placeholder="000.000.000-00"
/>

{erroCpf && (
  <small style={{ color: "red" }}>{erroCpf}</small>
)}

</div>




        </div>
      </section>

      {/* ================= IMAGENS ================= */}
<section className="card">
  <h2>Imagens da Loja</h2>

  <div className="upload-group">

    {/* FOTO PERFIL */}
    <div className="upload-box">
      <label>Foto de perfil</label>

      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setFotoPerfil(file);
            gerarPreview(file, setPreviewPerfil);
          }}
        />

        <div className="upload-content">
          {previewPerfil ? (
            <img
              src={previewPerfil}
              alt="Preview perfil"
              style={{ width: 120, borderRadius: 12 }}
            />
          ) : (
            <>
              <FiUploadCloud className="upload-icon" />
              <strong>Clique para enviar</strong>
              <span className="upload-hint">
                Imagem quadrada da loja
              </span>
            </>
          )}
        </div>
      </div>
    </div>

    {/* FOTO BANNER */}
    <div className="upload-box">
      <label>Foto banner</label>

      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setFotoBanner(file);
            gerarPreview(file, setPreviewBanner);
          }}
        />

        <div className="upload-content">
          {previewBanner ? (
            <img
              src={previewBanner}
              alt="Preview banner"
              style={{ width: 220, borderRadius: 12 }}
            />
          ) : (
            <>
              <FiUploadCloud className="upload-icon" />
              <strong>Clique para enviar</strong>
              <span className="upload-hint">
                Banner horizontal (topo da loja)
              </span>
            </>
          )}
        </div>
      </div>
    </div>

    {/* FOTO CAPA */}
    <div className="upload-box">
      <label>Foto capa</label>

      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setFotoCapa(file);
            gerarPreview(file, setPreviewCapa);
          }}
        />

        <div className="upload-content">
          {previewCapa ? (
            <img
              src={previewCapa}
              alt="Preview capa"
              style={{ width: 220, borderRadius: 12 }}
            />
          ) : (
            <>
              <FiUploadCloud className="upload-icon" />
              <strong>Clique para enviar</strong>
              <span className="upload-hint">
                Imagem de destaque da loja
              </span>
            </>
          )}
        </div>
      </div>
    </div>

  </div>
</section>



      {/* ================= ENDEREÇO ================= */}
      <section className="card">
        <h2>Endereço</h2>

        <div className="grid">
          <div className="field">
           <label>CEP</label>
<input
  type="text"
  value={cep}
  onChange={(e) => handleCep(e.target.value)}
  placeholder="00000-000"
/>

{erroCep && (
  <small style={{ color: "red" }}>{erroCep}</small>
)}


          </div>

          <div className="field">
            <label>Rua</label>
<input type="text" value={rua} readOnly />

          </div>

          <div className="field">
            <label>Número</label>
           <input
  type="text"
  value={numero}
  onChange={(e) => setNumero(e.target.value)}
/>

          </div>

          <div className="field">
            <label>Bairro</label>
<input type="text" value={bairro} readOnly />

          </div>

          <div className="field">
           <label>Cidade</label>
<input type="text" value={cidade} readOnly />

          </div>

          <div className="field">
            <label>Estado</label>
<input type="text" value={estado} readOnly />

          </div>
        </div>

        <div className="field">
          <label>Ponto de referência</label>
          <input
  type="text"
  value={pontoReferencia}
  onChange={(e) => setPontoReferencia(e.target.value)}
/>

        </div>
      </section>

      {/* ================= ÁREA DE ATENDIMENTO ================= */}
      <section className="card">
        <h2>Área de Atendimento</h2>

        <div className="field">
          <label>Bairros ou raio de atendimento</label>
         <input
  type="text"
  value={areaAtendimento}
  onChange={(e) => setAreaAtendimento(e.target.value)}
/>

        </div>
      </section>

      {/* ================= CONTATO ================= */}
      <section className="card">
        <h2>Contato</h2>

        <div className="grid">
          <div className="field">
            <label>Telefone</label>
<input
  type="text"
  value={telefone}
  onChange={(e) => handleTelefone(e.target.value)}
  placeholder="(00) 00000-0000"
/>

          </div>

          <div className="field">
            <label>WhatsApp</label>
<input
  type="text"
  value={whatsapp}
  onChange={(e) => handleWhatsapp(e.target.value)}
  placeholder="(00) 00000-0000"
/>

          </div>

          <div className="field">
            <label>Email</label>
           <input
  type="email"
  value={email}
  onChange={(e) => {
    const v = e.target.value;
    setEmail(v);
    setErroEmail(validarEmail(v) || v === "" ? "" : "Email inválido");
  }}
/>

{erroEmail && (
  <small style={{ color: "red" }}>{erroEmail}</small>
)}

          </div>
        </div>
      </section>

      {/* ================= OPERAÇÃO ================= */}
      <section className="card">
        <h2>Operação</h2>

        <div className="grid">
          <div className="field">
            <label>Horário de abertura</label>
            <input
  type="time"
  value={horarioAbertura}
  onChange={(e) => setHorarioAbertura(e.target.value)}
/>

          </div>

          <div className="field">
             <label>Horário de Fechamento</label>
            <input
  type="time"
  value={horarioFechamento}
  onChange={(e) => setHorarioFechamento(e.target.value)}
/>

           
          </div>

          <div className="field">
  <label>Dias de funcionamento</label>

  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    {diasSemana.map((dia) => (
      <button
        type="button"
        key={dia}
        onClick={() => toggleDia(dia)}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          cursor: "pointer",
          background: diasSelecionados.includes(dia)
            ? "#2563eb"
            : "#fff",
          color: diasSelecionados.includes(dia)
            ? "#fff"
            : "#000",
        }}
      >
        {dia}
      </button>
    ))}
  </div>

  {diasSelecionados.length > 0 && (
    <small style={{ marginTop: 6, display: "block" }}>
      Funcionamento: {diasSelecionados.join(", ")}
    </small>
  )}
</div>



<div className="field">
  <label>Tempo médio de preparo</label>

  <input
    type="time"
    step="60"
    value={tempoPreparo}
    onChange={(e) => handleTempoPreparo(e.target.value)}
  />
</div>



        </div>
      </section>

      

      {/* ================= AÇÃO ================= */}
      <div className="actions">
     
<button
  className="button-primary"
onClick={salvarAlteracoes}

>
  Salvar Alterações
</button>

     



</div>

    </div>
  );
}

