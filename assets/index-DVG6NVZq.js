import{u as l,j as e,O as o}from"./index-DRP4M8d0.js";const d=()=>{const s=l(),a=r=>{r.preventDefault();const t=r.currentTarget,n=t.elements.namedItem("query");s(`${n.value}`),t.reset()};return e.jsx("div",{className:"p-3",children:e.jsxs("form",{className:"w-full flex gap-3",onSubmit:r=>a(r),children:[e.jsx("label",{htmlFor:"query"}),e.jsx("input",{type:"text",name:"query",placeholder:"Enter board id...",className:"w-full px-2 py-5 h-7 border border-solid border-gray-400 rounded-sm"}),e.jsx("button",{className:"bg-gray-300 h-7 px-4 py-5 rounded-md text-sm inline-flex items-center",type:"submit",children:"Load"})]})})},m=()=>e.jsxs(e.Fragment,{children:[e.jsx(d,{}),e.jsx(o,{})]});export{m as default};
