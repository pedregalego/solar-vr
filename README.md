# 🪐 Sistema Solar VR · Tour Educativo

Aplicativo educacional interativo do Sistema Solar em realidade virtual, com estilo
cyberpunk/retrô. Funciona no navegador (desktop e celular), como PWA instalável e
como APK Android gerado pelo PWABuilder. Otimizado para o suporte de celular
**Shinecon SC-G04E** e o controle Bluetooth **Shinecon SC-BC03**.

## ✨ Recursos

- Sol pulsante com corona + 8 planetas com órbitas em escala logarítmica
- 9 luas orbitando em tempo real (Lua, Fobos, Deimos, Io, Europa, Ganimedes, Calisto, Titã, Encélado)
- Texturas 100% procedurais (Canvas API) — nenhuma imagem externa
- Seleção por toque/clique/gatilho com ficha técnica em modal cyberpunk
- Câmera orbital com giroscópio, toque/arrasto, teclado e gamepad
- Modo VR estéreo side-by-side com ajuste de IPD (50–78 mm)
- Disparo interativo com flash, vibração, som sintetizado e contador
- PWA completo: funciona offline após a primeira visita

## 🎮 Controles

| Ação | Shinecon SC-BC03 | Teclado/Mouse |
|---|---|---|
| Pausar/Despausar órbita | A ou B | Espaço ou Enter |
| Inverter sentido | X ou Y | Backspace ou Esc |
| Acelerar | D-pad ↑ / ← | Setas ↑ / → |
| Desacelerar | D-pad ↓ / → | Setas ↓ / ← |
| Diminuir / Aumentar IPD | L / R | Slider "AJUSTAR OLHOS" |
| Reiniciar câmera | Start | R |
| Disparar / Selecionar na mira | Gatilho (6/7) | Clique do mouse |

Toque em um planeta ou lua para abrir a ficha técnica. Toque em área vazia (ou
Esc) para fechar. Arraste na tela para olhar ao redor (±35°, mantendo o Sol
visível).

## 🚀 Teste local

Giroscópio e VR **não funcionam via `file://`** — é preciso servir por HTTP(S):

```bash
npx serve .
# ou
python3 -m http.server 8080
```

Para testar giroscópio no celular, use um túnel HTTPS:

```bash
npx serve . &
npx localtunnel --port 3000
```

Abra a URL `https://…` gerada no navegador do celular.

## 🌐 Publicar no GitHub Pages (passo a passo)

1. Crie um repositório no GitHub (ex.: `sistema-solar-vr`).
2. Envie todos os arquivos deste projeto para a raiz do repositório:
   ```bash
   git init
   git add .
   git commit -m "Sistema Solar VR"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/sistema-solar-vr.git
   git push -u origin main
   ```
3. No GitHub, abra **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**; branch `main`, pasta `/ (root)`. Salve.
5. Aguarde 1–2 minutos. O app estará em:
   `https://SEU_USUARIO.github.io/sistema-solar-vr/`
6. Acesse pelo celular — o GitHub Pages já serve via HTTPS, então giroscópio e
   VR funcionam direto. No Chrome Android, o banner "Instalar app" confirma que
   o PWA está válido.

> Todos os caminhos do projeto são relativos (`./`), então funciona tanto na
> raiz quanto em subdiretório do Pages sem nenhum ajuste.

## 📱 Gerar APK via PWABuilder

1. Com o app publicado no GitHub Pages, acesse **https://www.pwabuilder.com**.
2. Cole a URL do seu app (ex.: `https://SEU_USUARIO.github.io/sistema-solar-vr/`)
   e clique em **Start**.
3. O PWABuilder valida `manifest.json` e `service-worker.js` (ambos já prontos
   neste projeto — nota verde esperada).
4. Clique em **Package For Stores → Android**.
5. Recomendações de configuração:
   - **Package ID**: `com.seunome.solarvr` (só letras minúsculas e pontos)
   - **App name**: Sistema Solar VR · **Short name**: SolarVR
   - **Display mode**: Fullscreen · **Orientation**: Landscape
   - **Signing key**: deixe o PWABuilder gerar (guarde o arquivo `.keystore`!)
6. Baixe o `.zip`, extraia e instale o `app-release-signed.apk` no celular
   (ative "Instalar de fontes desconhecidas" nas configurações do Android).
7. Para publicar na Play Store, use o `.aab` incluído no pacote e o keystore
   gerado.

## 🥽 Modo VR (Shinecon SC-G04E)

1. Abra o app no celular via HTTPS e toque em **⬡ ENTRAR VR**.
2. Permita o acesso ao giroscópio (iOS pede confirmação).
3. Gire o celular para paisagem e encaixe no suporte Shinecon.
4. Ajuste a distância entre olhos com **AJUSTAR OLHOS** (ou botões L/R do
   controle) até as duas imagens se fundirem confortavelmente.
5. Pareie o controle SC-BC03 por Bluetooth (modo gamepad/HID — geralmente
   ligando com **@ + B**). O HUD mostra "🎮" quando detectado.
6. Toque em **✕ SAIR VR** para voltar ao modo normal.

## 📁 Estrutura do projeto

```
├── index.html          # Aplicação completa (HTML + CSS + JS + Three.js)
├── manifest.json       # Configuração PWA
├── service-worker.js   # Cache offline (cache-first + atualização em 2º plano)
├── icons/              # Ícones 72–512 px (gerados proceduralmente)
└── README.md
```

## ⚠️ Notas importantes

- O app **deve** ser servido via HTTPS (GitHub Pages já atende).
- iOS/Safari: o modo VR estéreo funciona, mas a trava de orientação não é
  suportada — gire o aparelho manualmente para paisagem.
- Sem gamepad? Tudo funciona com toque + teclado.
- As distâncias e tamanhos são comprimidos (escala logarítmica) para fins
  educacionais; os dados das fichas técnicas são os valores reais.

Feito com [Three.js 0.160](https://threejs.org) · Licença livre para uso educacional.
