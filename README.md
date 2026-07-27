# 音声入力アシスタント 🎤

Web Speech APIを使用した音声入力ツール。Safari、ChatGPT、Gmail など、**どのWebページでも使える** ブックマークレットです。

## 使い方

### 📱 Safari / iOS での使用方法

#### 1️⃣ **ブックマークレットをブックマークバーに追加**

下のリンクを **ブックマークバーにドラッグ&ドロップ** してください。

<a href="javascript:(function(){class FloatingVoiceAssistant{constructor(){this.STORAGE_KEY='mva_pos_state_v2';this.id='m_v_a_root';this.state={rec:false,r:20,b:100,drg:false,mvd:false,sx:0,sy:0,sr:0,sb:0,ignoreNextClick:false};this.rec=null;this.root=null;this.btn=null;this.cls=null;this.dbg=null;this.init()}init(){this.cleanExistingInstance();this.loadPositionState();this.createDomElements();this.initSpeechRecognition();this.bindEvents()}cleanExistingInstance(){try{const old=document.getElementById(this.id);if(old&&old.parentNode)old.parentNode.removeChild(old);if(window.__mvaR){try{window.__mvaR.stop()}catch(e){}}}catch(e){}}loadPositionState(){try{const saved=localStorage.getItem(this.STORAGE_KEY);if(saved){const parsed=JSON.parse(saved);if(typeof parsed.r==='number'&&typeof parsed.b==='number'){this.state.r=parsed.r;this.state.b=parsed.b;}}}catch(e){}}savePositionState(){try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify({r:this.state.r,b:this.state.b}))}catch(e){}}createDomElements(){this.root=document.createElement('div');this.root.id=this.id;this.root.style.cssText=`right:${this.state.r}px!important;bottom:${this.state.b}px!important;`;this.btn=document.createElement('div');this.btn.className='mva-btn';const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');svg.setAttribute('width','24');svg.setAttribute('height','24');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','#fff');svg.setAttribute('stroke-width','2.5');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('style','pointer-events:none;');const p1=document.createElementNS(ns,'path');p1.setAttribute('d','M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z');const p2=document.createElementNS(ns,'path');p2.setAttribute('d','M19 10v1a7 7 0 0 1-14 0v-1');const l1=document.createElementNS(ns,'line');l1.setAttribute('x1','12');l1.setAttribute('y1','19');l1.setAttribute('x2','12');l1.setAttribute('y2','23');const l2=document.createElementNS(ns,'line');l2.setAttribute('x1','8');l2.setAttribute('y1','23');l2.setAttribute('x2','16');l2.setAttribute('y2','23');svg.appendChild(p1);svg.appendChild(p2);svg.appendChild(l1);svg.appendChild(l2);this.btn.appendChild(svg);this.cls=document.createElement('div');this.cls.className='mva-cls';this.cls.appendChild(document.createTextNode('×'));this.dbg=document.createElement('div');this.dbg.className='mva-dbg';this.setDbgText('準備完了');this.btn.appendChild(this.cls);this.root.appendChild(this.btn);this.root.appendChild(this.dbg);document.body.appendChild(this.root);const style=document.createElement('style');style.textContent=`*{box-sizing:border-box;margin:0;padding:0}html,body{width:100%;height:100%;overflow:hidden;background:transparent}#m_v_a_root{position:fixed!important;z-index:2147483647!important;font-family:sans-serif!important;touch-action:none!important;-webkit-user-select:none!important;user-select:none!important}.mva-btn{width:56px!important;height:56px!important;border-radius:50%!important;background:linear-gradient(135deg,#ffd700 0%,#ff8c00 100%)!important;box-shadow:0 4px 14px rgba(0,0,0,0.5)!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;border:3px solid #34c759!important;box-sizing:border-box!important;position:relative!important;-webkit-tap-highlight-color:transparent!important}.mva-cls{position:absolute!important;top:-10px!important;right:-10px!important;width:26px!important;height:26px!important;border-radius:50%!important;background:#ff3b30!important;color:#fff!important;font-size:15px!important;font-weight:bold!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;border:2px solid #fff!important;box-shadow:0 2px 5px rgba(0,0,0,0.3)!important;-webkit-tap-highlight-color:transparent!important}.mva-dbg{position:absolute!important;right:68px!important;bottom:10px!important;background:rgba(0,0,0,0.85)!important;color:#00ffcc!important;padding:5px 10px!important;border-radius:6px!important;font-size:11px!important;white-space:nowrap!important;pointer-events:none!important;border:1px solid rgba(255,255,255,0.3)!important;max-width:200px!important;overflow:hidden!important;text-overflow:ellipsis!important}`;document.head.appendChild(style)}setDbgText(txt){if(!this.dbg)return;while(this.dbg.firstChild){this.dbg.removeChild(this.dbg.firstChild)}this.dbg.appendChild(document.createTextNode(txt))}initSpeechRecognition(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){this.setDbgText('Speech非対応');return}try{this.rec=new SR();this.rec.lang='ja-JP';this.rec.interimResults=true;this.rec.continuous=true;window.__mvaR=this.rec;this.rec.onstart=()=>{this.setDbgText('音声認識中...')};this.rec.onresult=(e)=>{let finalStr='';let interimStr='';for(let i=e.resultIndex;i<e.results.length;++i){if(e.results[i].isFinal){finalStr+=e.results[i][0].transcript}else{interimStr+=e.results[i][0].transcript}}if(interimStr){this.setDbgText('🎤 '+interimStr)}if(finalStr){this.setDbgText('✍️ '+finalStr);this.insertTextToActiveElement(finalStr)}};this.rec.onerror=(e)=>{if(e.error!=='no-speech'&&e.error!=='aborted'){this.setDbgText('ERR:'+e.error)}};this.rec.onend=()=>{if(this.state.rec){try{this.rec.start()}catch(err){this.setDbgText('再始動失敗')}}else{this.setDbgText('録音停止')}}}catch(e){this.setDbgText('REC初期化不可')}}insertTextToActiveElement(txt){let el=document.activeElement;const selectors=['#prompt-textarea','textarea','[contenteditable=\"true\"]','input[type=\"text\"]','input[type=\"search\"]','[role=\"textbox\"]','.ProseMirror'];if(!el||el===document.body||el===document.documentElement){for(let i=0;i<selectors.length;i++){const found=document.querySelector(selectors[i]);if(found&&found.offsetParent!==null){el=found;break}}}if(!el){this.setDbgText('入力欄なし');return}try{el.focus()}catch(e){}const tag=el.tagName?el.tagName.toLowerCase():'';if(tag==='textarea'||tag==='input'){const val=el.value||'';const len=val.length;el.value=val+txt;el.selectionStart=el.selectionEnd=len+txt.length;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))}else{try{const selObj=window.getSelection();if(selObj&&selObj.rangeCount>0){const range=selObj.getRangeAt(0);range.collapse(false);const node=document.createTextNode(txt);range.insertNode(node);range.setStartAfter(node);range.setEndAfter(node);selObj.removeAllRanges();selObj.addRange(range)}else{el.appendChild(document.createTextNode(txt))}}catch(e){el.appendChild(document.createTextNode(txt))}el.dispatchEvent(new Event('input',{bubbles:true}))}}toggleRecording(){if(!this.rec){alert('お使いのブラウザは音声認識機能に対応していないか、権限が許可されていません');return}if(!this.state.rec){try{this.state.rec=true;this.rec.start();this.btn.style.borderColor='#ff3b30';this.setDbgText('録音開始')}catch(e){this.state.rec=false;this.setDbgText('開始失敗:'+(e.message||'ERR'))}}else{this.state.rec=false;try{this.rec.stop()}catch(e){}this.btn.style.borderColor='#34c759';this.setDbgText('録音停止')}}destroy(){if(this.rec){try{this.rec.stop()}catch(e){}}if(this.root&&this.root.parentNode){this.root.parentNode.removeChild(this.root)}window.__mvaR=null}getPointerPosition(e){if(e.touches&&e.touches.length>0){return{x:e.touches[0].clientX,y:e.touches[0].clientY}}return{x:e.clientX,y:e.clientY}}onPointerStart(e){if(e.target===this.cls)return;this.state.drg=true;this.state.mvd=false;const p=this.getPointerPosition(e);this.state.sx=p.x;this.state.sy=p.y;this.state.sr=this.state.r;this.state.sb=this.state.b}onPointerMove(e){if(!this.state.drg)return;const p=this.getPointerPosition(e);const dx=p.x-this.state.sx;const dy=p.y-this.state.sy;if(Math.abs(dx)>8||Math.abs(dy)>8){this.state.mvd=true}if(this.state.mvd){let nr=this.state.sr-dx;let nb=this.state.sb-dy;nr=Math.max(10,Math.min(nr,window.innerWidth-70));nb=Math.max(10,Math.min(nb,window.innerHeight-70));this.state.r=nr;this.state.b=nb;this.root.style.right=`${nr}px`;this.root.style.bottom=`${nb}px`}}onPointerEnd(e){if(!this.state.drg)return;this.state.drg=false;if(this.state.mvd){this.savePositionState()}else{if(e.type==='touchend'){e.preventDefault();this.state.ignoreNextClick=true}this.toggleRecording()}setTimeout(()=>{this.state.ignoreNextClick=false},300)}bindEvents(){this.cls.addEventListener('touchend',(e)=>{e.preventDefault();e.stopPropagation();this.destroy()},{passive:false});this.cls.addEventListener('click',(e)=>{e.stopPropagation();this.destroy()});this.btn.addEventListener('touchstart',(e)=>this.onPointerStart(e),{passive:true});window.addEventListener('touchmove',(e)=>this.onPointerMove(e),{passive:true});this.btn.addEventListener('touchend',(e)=>this.onPointerEnd(e),{passive:false});this.btn.addEventListener('mousedown',(e)=>this.onPointerStart(e));window.addEventListener('mousemove',(e)=>this.onPointerMove(e));this.btn.addEventListener('mouseup',(e)=>{if(this.state.ignoreNextClick)return;this.onPointerEnd(e)})}}window.addEventListener('DOMContentLoaded',()=>{new FloatingVoiceAssistant()});new FloatingVoiceAssistant()})();" style="background-color: #ff8c00; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; cursor: pointer;">
  🎤 音声入力をブックマークに追加
</a>

#### 2️⃣ **使用方法**

1. **ブックマークをタップ** → 画面右下に 🎤 オレンジの音声ボタンが表示されます
2. **ボタンをタップ** → 「準備完了」→ 「音声認識中...」と変わります
3. **日本語で話す** → 自動的にテキストに変換されます
4. **入力欄に自動挿入** → ChatGPT、Gmail、メモアプリなど、どのテキストボックスにも対応
5. **×ボタン** → タップして終了

#### 3️⃣ **対応ブラウザ**

- ✅ Safari (iOS 14.5以降)
- ✅ Chrome
- ✅ Edge
- ✅ Firefox
- ✅ ChatGPT WebアプリinSafari

#### 4️⃣ **対応するテキスト入力欄**

- ChatGPT
- Gmail
- X (Twitter)
- メモアプリ
- Notion
- Google Docs
- その他の textarea や input[type="text"]

---

## 🛠️ 技術仕様

- **API**: Web Speech API（ブラウザネイティブ）
- **言語**: 日本語 (ja-JP)
- **オフライン対応**: インターネット接続でのみ動作
- **権限**: マイクへのアクセス許可が必要

---

## 📌 トラブルシューティング

### 「Speech非対応」と表示される
→ お使いのブラウザが Web Speech API に対応していません。Safari、Chrome、Edge などの最新版を使用してください。

### マイクへのアクセスを求められない
→ ブラウザ設定でマイクの使用を許可してください。
- **Safari**: 設定 > プライバシー > マイク > このサイトを許可
- **Chrome**: サイト設定 > マイク > 許可

### テキストが入力されない
→ テキストボックスにフォーカス（カーソルがある状態）にしてから使用してください。

---

## 📝 ライセンス

自由に使用・改造・配布してください。

---

## 🔗 詳細

- GitHub Repository: https://github.com/hirodenkun919-source/mic
- 公式ページ: https://hirodenkun919-source.github.io/mic/
