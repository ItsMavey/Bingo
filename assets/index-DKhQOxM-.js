(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=t(e);fetch(e.href,n)}})();let l=new Set;function m(r,o){if(l.size>=o-r+1)throw new Error("All numbers in the range have been used.");let t;do t=Math.floor(Math.random()*(o-r+1))+r;while(l.has(t));return l.add(t),t}function f(){l.clear()}document.querySelector("#app").innerHTML=`
  <h1>BINGO DDV</h1>
  <h2>2025</h2>
  <pre id="numbers">00</pre>
  <div class="buttons">
    <button id="start">Nouveau nombre</button>
    <button id="verify">Vérification</button>
    <button id="reset">Réinitialiser</button>
  </div>

  <!-- Modal -->
  <div id="verifyModal" class="modal hidden">
    <div class="modal-content">
      <h3>Vérifier vos numéros</h3>
      <form id="verifyForm">
        <div class="inputs">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
        </div>
        <div class="modal-buttons">
          <button type="submit">Vérifier</button>
          <button type="button" id="closeModal">Fermer</button>
        </div>
      </form>
    </div>
  </div>
`;let c=new Set;const s=document.getElementById("numbers"),p=document.getElementById("start"),y=document.getElementById("verify"),b=document.getElementById("reset"),d=document.getElementById("verifyModal"),v=document.getElementById("closeModal"),u=document.getElementById("verifyForm");p.addEventListener("click",()=>{try{const r=m(0,99);c.add(r),s.classList.remove("spin"),s.offsetWidth,s.classList.add("spin"),setTimeout(()=>{s.textContent=r.toString().padStart(2,"0")},150)}catch{s.textContent="🎉 FIN"}});b.addEventListener("click",()=>{f(),c.clear(),s.textContent="00"});y.addEventListener("click",()=>{d.classList.remove("hidden")});v.addEventListener("click",()=>{d.classList.add("hidden")});u.addEventListener("submit",r=>{r.preventDefault(),u.querySelectorAll("input").forEach(t=>{const i=parseInt(t.value,10);isNaN(i)?t.style.border="2px solid gray":c.has(i)?(t.style.border="2px solid #4CAF50",t.style.background="rgba(76, 175, 80, 0.15)"):(t.style.border="2px solid #E53935",t.style.background="rgba(229, 57, 53, 0.15)")})});d.addEventListener("click",r=>{r.target===d&&d.classList.add("hidden")});
