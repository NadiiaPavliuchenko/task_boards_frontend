import{u as h,j as e,a as g,c as b,b as y,r as x,d as v,e as w}from"./index-Bew2U_B1.js";import{I as B,s as C,u as M,F as _,H as k,a as S}from"./index-GsXhZHiF.js";const u=({isModalOpen:d,handleCloseModal:i,boardData:s})=>{const o=h(),m=l=>{l.preventDefault();const r=l.currentTarget,c=r.elements.namedItem("name");if(s){const n={_id:s==null?void 0:s._id,name:c.value};o(g(n))}else{const n={name:c.value};o(b(n))}r.reset(),i()};return d&&e.jsx("div",{className:"bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 w-full h-full z-0",onClick:i,children:e.jsxs("div",{className:"bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] rounded-xl p-5 min-h-[200px]",onClick:l=>l.stopPropagation(),children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h3",{className:"text-xl",children:"Board"}),e.jsx("button",{className:"inline-flex items-center",type:"button",onClick:i,children:e.jsx(B,{className:"w-6 h-6"})})]}),e.jsxs("form",{className:"mt-4 flex gap-3 flex-col",onSubmit:l=>m(l),children:[e.jsxs("p",{id:"hashedId",children:["Board id: ",s==null?void 0:s._id]}),e.jsx("label",{htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",name:"name",placeholder:"Enter board`s name...",className:"border border-gray-400 rounded-sm p-3",defaultValue:s?s.name:""}),e.jsx("button",{type:"submit",className:"bg-gray-300 h-9 w-20 px-4 py-4 rounded-md text-sm inline-flex items-center justify-center self-end",children:"Send"})]})]})})},P=()=>{const d=y(C),i=h(),[s,o]=x.useState("add"),[m,l]=x.useState(),r=v(),{isOpen:c,openModal:n,closeModal:p}=M(!1),f=()=>{n(),o("add")},j=(t,a)=>{t.stopPropagation(),a&&i(w(a))},N=(t,a)=>{t.stopPropagation(),n(),o("edit"),l(a)};return e.jsxs("div",{className:"p-4",children:[e.jsx("button",{className:"mt-7 inlibe-flex rounded-full p-2 bg-gray-400",type:"button",onClick:f,children:e.jsx(_,{className:"fill-white w-[20px] h-[20px]"})}),e.jsx("ul",{className:"mt-4 flex gap-[20px] flex-wrap items-center",children:d&&d.map(t=>e.jsxs("li",{className:"w-[190px] h-[190px] p-2.5 bg-gray-200 relative flex flex-col items-center justify-center","data-id":t._id,onClick:()=>r(`board/${t._id}`),children:[e.jsx("p",{className:"text-sm text-gray-500 absolute top-1 left-1",children:t._id}),e.jsx("div",{className:"text-md",children:t.name}),e.jsxs("div",{className:"absolute bottom-[10px] flex gap-2.5",children:[e.jsx("button",{type:"button",onClick:a=>N(a,t),children:e.jsx(k,{className:"w-[20px] h-[20px] hover:fill-blue-400"})}),e.jsx("button",{type:"button",onClick:a=>j(a,t._id),children:e.jsx(S,{className:"w-[20px] h-[20px] hover:fill-red-500"})})]})]},t._id))}),s==="add"?e.jsx(u,{isModalOpen:c,handleCloseModal:p}):e.jsx(u,{isModalOpen:c,handleCloseModal:p,boardData:m})]})};export{P as default};
