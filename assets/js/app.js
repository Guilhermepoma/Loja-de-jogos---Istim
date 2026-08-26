// SVG icons inline reutilizáveis
const ICON_EDIT  = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const ICON_TRASH = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;
const ICON_GAME  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="16" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13" r="1" fill="currentColor"/></svg>`;
const ICON_WARN  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

// ── Estado ──
let todosOsJogos = [];
let modoEdicao = false;
const API = 'api/';

document.addEventListener('DOMContentLoaded', carregarJogos);

async function carregarJogos() {
    const lista = document.getElementById('gamesList');
    lista.innerHTML = `<div class="loading"><div class="spinner"></div><p style="color:var(--text-dim);font-size:13px">Carregando jogos...</p></div>`;
    try {
        const res = await fetch(API + 'listar.php');
        const jogos = await res.json();
        todosOsJogos = jogos;
        renderizarJogos(jogos);
    } catch (err) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">${ICON_WARN}</div>
                <h3>Não foi possível carregar</h3>
                <p>Verifique se a API está rodando corretamente.</p>
                <button class="btn btn-accent" onclick="carregarJogos()">Tentar novamente</button>
            </div>`;
    }
}

function filtrarJogos() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const filtrados = todosOsJogos.filter(j =>
        j.nome.toLowerCase().includes(q) || j.descricao.toLowerCase().includes(q)
    );
    renderizarJogos(filtrados);
}

function renderizarJogos(jogos) {
    const lista = document.getElementById('gamesList');
    const count = document.getElementById('gameCount');
    count.textContent = `${jogos.length} jogo${jogos.length !== 1 ? 's' : ''} encontrado${jogos.length !== 1 ? 's' : ''}`;

    if (!jogos.length) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">${ICON_GAME}</div>
                <h3>Nenhum jogo encontrado</h3>
                <p>Adicione jogos ao catálogo ou ajuste sua pesquisa.</p>
                <button class="btn btn-primary" onclick="abrirModalAdicionar()">Adicionar Jogo</button>
            </div>`;
        return;
    }

    lista.innerHTML = `<div class="games-grid">${jogos.map(cardHtml).join('')}</div>`;
}

function cardHtml(j) {
    const preco = parseFloat(j.valor);
    const precoBadge = preco === 0
        ? `<span class="price-badge price-free">GRÁTIS</span>`
        : `<span class="price-badge">R$ ${preco.toFixed(2)}</span>`;

    const imgEl = j.img
        ? `<img class="card-img" src="${escHtml(j.img)}" alt="${escHtml(j.nome)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : '';
    const placeholder = `<div class="card-img-placeholder" ${j.img ? 'style="display:none"' : ''}>${ICON_GAME}</div>`;

    return `
    <div class="game-card">
        ${imgEl}${placeholder}
        <div class="card-body">
            <div class="card-title">${escHtml(j.nome)}</div>
            <div class="card-desc">${escHtml(j.descricao)}</div>
            <div class="card-footer">
                <span class="card-id">#${j.id}</span>
                ${precoBadge}
            </div>
        </div>
        <div class="card-actions">
            <button class="btn btn-accent btn-sm" onclick="abrirModalEditar(${j.id},'${escJs(j.nome)}','${escJs(j.descricao)}','${escJs(j.valor)}','${escJs(j.img)}')">
                ${ICON_EDIT} Editar
            </button>
            <button class="btn btn-danger btn-sm btn-icon" onclick="confirmarDeletar(${j.id})" title="Remover">
                ${ICON_TRASH}
            </button>
        </div>
    </div>`;
}

function abrirModalAdicionar() {
    modoEdicao = false;
    document.getElementById('modalTitle').textContent = 'Adicionar Jogo';
    document.getElementById('btnSalvarModal').textContent = 'Cadastrar Jogo';
    document.getElementById('editId').value = '';
    document.getElementById('formNome').value = '';
    document.getElementById('formDescricao').value = '';
    document.getElementById('formValor').value = '';
    document.getElementById('formImg').value = '';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('modalOverlay').classList.add('open');
    setTimeout(() => document.getElementById('formNome').focus(), 50);
}

function abrirModalEditar(id, nome, descricao, valor, img) {
    modoEdicao = true;
    document.getElementById('modalTitle').textContent = 'Editar Jogo';
    document.getElementById('btnSalvarModal').textContent = 'Salvar Alterações';
    document.getElementById('editId').value = id;
    document.getElementById('formNome').value = nome;
    document.getElementById('formDescricao').value = descricao;
    document.getElementById('formValor').value = valor;
    document.getElementById('formImg').value = img;
    previewImagem();
    document.getElementById('modalOverlay').classList.add('open');
}

function fecharModal(e) {
    if (e && e.target !== document.getElementById('modalOverlay')) return;
    document.getElementById('modalOverlay').classList.remove('open');
}

function previewImagem() {
    const url = document.getElementById('formImg').value;
    const preview = document.getElementById('imgPreview');
    const img = document.getElementById('imgPreviewImg');
    if (url) {
        preview.style.display = 'block';
        img.src = url;
        img.onerror = () => { preview.style.display = 'none'; };
    } else {
        preview.style.display = 'none';
    }
}

async function salvarJogo() {
    const nome      = document.getElementById('formNome').value.trim();
    const descricao = document.getElementById('formDescricao').value.trim();
    const valor     = document.getElementById('formValor').value;
    const img       = document.getElementById('formImg').value.trim();

    if (!nome || !descricao || valor === '') {
        toast('Preencha todos os campos obrigatórios.', 'error');
        return;
    }

    const btn = document.getElementById('btnSalvarModal');
    btn.disabled = true;
    btn.textContent = 'Salvando...';

    try {
        const endpoint = modoEdicao ? 'update.php' : 'add.php';
        const id = document.getElementById('editId').value;
        const body = modoEdicao
            ? `id=${enc(id)}&nome=${enc(nome)}&descricao=${enc(descricao)}&valor=${enc(valor)}&img=${enc(img)}`
            : `nome=${enc(nome)}&descricao=${enc(descricao)}&valor=${enc(valor)}&img=${enc(img)}`;

        const res = await fetch(API + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body
        });
        const txt = await res.text();

        if (txt.trim() === 'success') {
            toast(modoEdicao ? 'Jogo atualizado com sucesso!' : 'Jogo cadastrado com sucesso!', 'success');
            document.getElementById('modalOverlay').classList.remove('open');
            carregarJogos();
        } else {
            toast('Erro ao salvar. Verifique a API.', 'error');
        }
    } catch {
        toast('Erro de conexão com a API.', 'error');
    }

    btn.disabled = false;
    btn.textContent = modoEdicao ? 'Salvar Alterações' : 'Cadastrar Jogo';
}

let idParaDeletar = null;

function confirmarDeletar(id) {
    idParaDeletar = id;
    document.getElementById('confirmOverlay').classList.add('open');
    document.getElementById('btnConfirmDel').onclick = executarDeletar;
}

function fecharConfirm() {
    document.getElementById('confirmOverlay').classList.remove('open');
    idParaDeletar = null;
}

async function executarDeletar() {
    if (!idParaDeletar) return;
    fecharConfirm();
    try {
        const res = await fetch(API + 'deletar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${idParaDeletar}`
        });
        const txt = await res.text();
        if (txt.trim() === 'success') {
            toast('Jogo removido do catálogo.', 'success');
            carregarJogos();
        } else {
            toast('Erro ao remover.', 'error');
        }
    } catch {
        toast('Erro de conexão.', 'error');
    }
}

function toast(msg, tipo = '') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${tipo}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3100);
}

function enc(v)    { return encodeURIComponent(v); }
function escHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escJs(s)  { return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { fecharModal(); fecharConfirm(); }
});