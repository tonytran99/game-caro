(this["webpackJsonpgame-caro"]=this["webpackJsonpgame-caro"]||[]).push([[5],{165:function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return c}));var a=r(169),n=r(188),o=r(5),i=function(e){var t,r={},o=Object(n.a)(e);try{for(o.s();!(t=o.n()).done;){var i=t.value,c=Object(a.a)(i,2),s=c[0],l=c[1];r[s]=l}}catch(d){o.e(d)}finally{o.f()}return r},c=function(e){for(var t=[],r=0;r<e;r++){for(var a=[],n=0;n<e;n++)a.push(o.b);t.push(a)}return t}},198:function(e,t,r){"use strict";var a=r(2),n=r(4),o=r(0),i=(r(22),r(23)),c=r(180),s=r(27),l=r(36),d=r(181),u=r(179),h=o.forwardRef((function(e,t){var r=e.children,s=e.classes,h=e.className,p=e.color,g=void 0===p?"primary":p,f=e.component,m=void 0===f?"div":f,b=e.disabled,y=void 0!==b&&b,v=e.error,A=void 0!==v&&v,B=e.fullWidth,C=void 0!==B&&B,Q=e.focused,D=e.hiddenLabel,O=void 0!==D&&D,E=e.margin,j=void 0===E?"none":E,k=e.required,w=void 0!==k&&k,x=e.size,M=e.variant,R=void 0===M?"standard":M,N=Object(n.a)(e,["children","classes","className","color","component","disabled","error","fullWidth","focused","hiddenLabel","margin","required","size","variant"]),F=o.useState((function(){var e=!1;return r&&o.Children.forEach(r,(function(t){if(Object(d.a)(t,["Input","Select"])){var r=Object(d.a)(t,["Select"])?t.props.input:t;r&&Object(c.a)(r.props)&&(e=!0)}})),e})),H=F[0],S=F[1],T=o.useState((function(){var e=!1;return r&&o.Children.forEach(r,(function(t){Object(d.a)(t,["Input","Select"])&&Object(c.b)(t.props,!0)&&(e=!0)})),e})),I=T[0],P=T[1],J=o.useState(!1),z=J[0],Y=J[1],K=void 0!==Q?Q:z;y&&K&&Y(!1);var L=o.useCallback((function(){P(!0)}),[]),q={adornedStart:H,setAdornedStart:S,color:g,disabled:y,error:A,filled:I,focused:K,fullWidth:C,hiddenLabel:O,margin:("small"===x?"dense":void 0)||j,onBlur:function(){Y(!1)},onEmpty:o.useCallback((function(){P(!1)}),[]),onFilled:L,onFocus:function(){Y(!0)},registerEffect:void 0,required:w,variant:R};return o.createElement(u.a.Provider,{value:q},o.createElement(m,Object(a.a)({className:Object(i.a)(s.root,h,"none"!==j&&s["margin".concat(Object(l.a)(j))],C&&s.fullWidth),ref:t},N),r))}));t.a=Object(s.a)({root:{display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},marginNormal:{marginTop:16,marginBottom:8},marginDense:{marginTop:8,marginBottom:4},fullWidth:{width:"100%"}},{name:"MuiFormControl"})(h)},199:function(e,t){e.exports="data:image/png;base64,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"},200:function(e,t,r){"use strict";var a=r(10),n=r(13),o=r(14),i=r(51),c=r(16),s=r(15),l=r(0),d=r.n(l),u=r(19),h=r(27),p=r(8),g=r(298),f=r(299),m=r(165),b=r(5),y=function(e,t,r){if(e[t])return e[t][r]},v=function(e,t,r,a){return void 0===Array.from({length:5},(function(n,o){return y(e,t,r+o)===a})).find((function(e){return!e}))},A=function(e,t,r,a){return void 0===Array.from({length:5},(function(n,o){return y(e,t+o,r)===a})).find((function(e){return!e}))},B=function(e,t,r,a){return void 0===Array.from({length:5},(function(n,o){return y(e,t+o,r+o)===a})).find((function(e){return!e}))},C=function(e,t,r,a){return void 0===Array.from({length:5},(function(n,o){return y(e,t+o,r-o)===a})).find((function(e){return!e}))},Q=function(e,t,r){for(var a=0;a<t;a++)for(var n=0;n<t;n++)if(v(e,a,n,r)||A(e,a,n,r)||B(e,a,n,r)||C(e,a,n,r))return!0;return!1},D=function(e,t,r,a){return Q(e,t,r)?r:!!Q(e,t,a)&&a},O=function(e,t,r){if(e[t])return e[t][r]},E=function(e,t,r,a,n,o){if(r+a<n&&void 0===Array.from({length:a},(function(a,n){return O(e,t,r+n)===o})).find((function(e){return!e}))){if(O(e,t,r-1)===b.b)return{power:a,x:t,y:r-1};if(O(e,t,r+a)===b.b)return{power:a,x:t,y:r+a}}},j=function(e,t,r,a,n,o){if(t+a<n&&void 0===Array.from({length:a},(function(a,n){return O(e,t+n,r)===o})).find((function(e){return!e}))){if(O(e,t-1,r)===b.b)return{power:a,x:t-1,y:r};if(O(e,t+a,r)===b.b)return{power:a,x:t+a,y:r}}},k=function(e,t,r,a,n,o){if(t+a<n&&r+a<n&&void 0===Array.from({length:a},(function(a,n){return O(e,t+n,r+n)===o})).find((function(e){return!e}))){if(O(e,t-1,r-1)===b.b)return{power:a,x:t-1,y:r-1};if(O(e,t+a,r+a)===b.b)return{power:a,x:t+a,y:r+a}}},w=function(e,t,r,a,n,o){if(void 0===Array.from({length:a},(function(a,n){return O(e,t+n,r-n)===o})).find((function(e){return!e}))){if(O(e,t-1,r+1)===b.b)return{power:a,x:t-1,y:r+1};if(O(e,t+a,r-a)===b.b)return{power:a,x:t+a,y:r-a}}},x=function(e,t,r){for(var a=4;a>0;a--)for(var n=0;n<t;n++)for(var o=0;o<t;o++){var i=E(e,n,o,a,t,r);if(void 0!==i)return i;var c=j(e,n,o,a,t,r);if(void 0!==c)return c;var s=k(e,n,o,a,t,r);if(void 0!==s)return s;var l=w(e,n,o,a,0,r);if(void 0!==l)return l}return function(e,t){for(var r=Math.floor(Math.random()*t),a=Math.floor(Math.random()*t);O(e,r,a)!==b.b;)r=Math.floor(Math.random()*t),a=Math.floor(Math.random()*t);return{x:r,y:a,power:-1}}(e,t)},M=r(101),R=function(e){Object(c.a)(r,e);var t=Object(s.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e)).state={countTurn:0,turnCurrent:e.firstTurn,board:Object(m.a)(e.size),updateState:!1,chessmanUserId:e.chessmanUserId,gameFinished:!1,dataBoardUpdateChessBoard:null,update:!1,iconChessmanA:e.iconChessmanA,iconChessmanB:e.iconChessmanB,sizeChessBoard:e.size,firstTurn:e.firstTurn},a.playChessman=a.playChessman.bind(Object(i.a)(a)),a}return Object(o.a)(r,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dataBoardTrainingDefault,r=e.dataBoardUpdateChessBoard;t&&this.setState(Object(a.a)({},t)),r&&this.setState(Object(a.a)(Object(a.a)({},r),{},{dataBoardUpdateChessBoard:r}))}},{key:"componentDidUpdate",value:function(e,t,r){var n=this.props,o=n.dataBoardUpdateChessBoard,i=n.chessBoardType,c=n.size;if(this.state.update&&this.setState({update:!1},(function(){this.setState(Object(a.a)(Object(a.a)({},o),{},{dataBoardUpdateChessBoard:o}))})),i===b.g){var s=this.state,l=s.turnCurrent,d=s.board;if(l===b.a){var u=function(e,t){var r=[x(e,t,b.c),x(e,t,b.a)],a=r[0],n=r[1],o=n.power>a.power?n:a;return{x:o.x,y:o.y}}(d,c);this.playChessman(u.x,u.y)}}}},{key:"playChessman",value:function(e,t){var r=this.state,n=r.turnCurrent,o=r.board,i=r.countTurn,c=r.gameFinished,s=this.props,l=s.chessmanA,d=s.chessmanB,u=s.size,h=s.chessBoardType,p=s.chessmanUserId,g=this.state;if(!c&&(h!==b.f||n===p)){var f={},m=o;m[e][t]=n,(f=Object(a.a)(Object(a.a)({},f),{},{countTurn:i+1,updateState:!0})).board=m,b.f,f.turnCurrent=n===l?d:l,D(m,u,l)?(this.props.checkWinChessman(l),f.gameFinished=!0):D(m,u,d)&&(this.props.checkWinChessman(d),f.gameFinished=!0),g=Object(a.a)(Object(a.a)({},g),f),this.props.getDataBoardCurrent(g),this.setState(f)}}},{key:"render",value:function(){var e=this,t=this.state,r=t.board,a=t.turnCurrent,n=(t.countTurn,this.props),o=(n.classes,n.dataUserAuth,n.size),i=n.chessmanA,c=n.chessmanB,s=n.iconChessmanA,l=n.iconChessmanB,u=(n.dataBoardTrainingDefault,n.canPlayChess),h=n.chessBoardType;return d.a.createElement(g.a,{cellHeight:o<=12?40:o>12&&o<=15?36:o>15&&o<=17?33:30,cols:o,spacing:0,style:{width:o<=12?40*o:o>12&&o<=15?36*o:o>15&&o<=17?33*o:30*o,height:o<=12?40*o:o>12&&o<=15?36*o:o>15&&o<=17?33*o:30*o}},r.map((function(t,r){return t.map((function(t,n){return d.a.createElement(f.a,{key:"row-".concat(r,"-cell-").concat(n),style:{border:"1px solid #056676"}},d.a.createElement("div",{style:{backgroundColor:"#e8ded2",width:"100%",height:"100%",display:"flex",alignItem:"center",justifyContent:"center",cursor:"pointer"},onClick:function(){t===b.b&&(u||void 0===u)&&(h===b.g?a!==b.a&&e.playChessman(r,n):e.playChessman(r,n))}},t===i?d.a.createElement("img",{style:{width:o<=12?36:o>12&&o<=15?33:o>15&&o<=17?30:27,height:o<=12?36:o>12&&o<=15?33:o>15&&o<=17?30:27,cursor:"pointer"},src:s.chessmanUrl,alt:s.name?s.name:""}):t===c?d.a.createElement("img",{style:{width:o<=12?36:o>12&&o<=15?33:o>15&&o<=17?30:27,height:o<=12?36:o>12&&o<=15?33:o>15&&o<=17?30:27,cursor:"pointer"},src:l.chessmanUrl,alt:l.name?l.name:""}):""))}))})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.dataBoardUpdateChessBoard&&JSON.stringify(e.dataBoardUpdateChessBoard)!==JSON.stringify(t.dataBoardUpdateChessBoard)?{update:!0}:null}}]),r}(d.a.Component);t.a=Object(p.d)(Object(u.b)((function(e){return{dataUserAuth:e.authReducer.dataUserAuth}}),(function(e){return{}})),Object(h.a)((function(e){return{welcomeWrapper:{}}})),Object(M.a)())(R)},234:function(e,t,r){"use strict";var a=r(13),n=r(14),o=r(16),i=r(15),c=r(0),s=r.n(c),l=r(313),d=r(2),u=r(4),h=(r(22),r(23)),p=r(27),g=c.forwardRef((function(e,t){var r=e.classes,a=e.className,n=e.dividers,o=void 0!==n&&n,i=Object(u.a)(e,["classes","className","dividers"]);return c.createElement("div",Object(d.a)({className:Object(h.a)(r.root,a,o&&r.dividers),ref:t},i))})),f=Object(p.a)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(g),m=r(36),b={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p"},y=c.forwardRef((function(e,t){var r=e.align,a=void 0===r?"inherit":r,n=e.classes,o=e.className,i=e.color,s=void 0===i?"initial":i,l=e.component,p=e.display,g=void 0===p?"initial":p,f=e.gutterBottom,y=void 0!==f&&f,v=e.noWrap,A=void 0!==v&&v,B=e.paragraph,C=void 0!==B&&B,Q=e.variant,D=void 0===Q?"body1":Q,O=e.variantMapping,E=void 0===O?b:O,j=Object(u.a)(e,["align","classes","className","color","component","display","gutterBottom","noWrap","paragraph","variant","variantMapping"]),k=l||(C?"p":E[D]||b[D])||"span";return c.createElement(k,Object(d.a)({className:Object(h.a)(n.root,o,"inherit"!==D&&n[D],"initial"!==s&&n["color".concat(Object(m.a)(s))],A&&n.noWrap,y&&n.gutterBottom,C&&n.paragraph,"inherit"!==a&&n["align".concat(Object(m.a)(a))],"initial"!==g&&n["display".concat(Object(m.a)(g))]),ref:t},j))})),v=Object(p.a)((function(e){return{root:{margin:0},body2:e.typography.body2,body1:e.typography.body1,caption:e.typography.caption,button:e.typography.button,h1:e.typography.h1,h2:e.typography.h2,h3:e.typography.h3,h4:e.typography.h4,h5:e.typography.h5,h6:e.typography.h6,subtitle1:e.typography.subtitle1,subtitle2:e.typography.subtitle2,overline:e.typography.overline,srOnly:{position:"absolute",height:1,width:1,overflow:"hidden"},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},alignJustify:{textAlign:"justify"},noWrap:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},gutterBottom:{marginBottom:"0.35em"},paragraph:{marginBottom:16},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorTextPrimary:{color:e.palette.text.primary},colorTextSecondary:{color:e.palette.text.secondary},colorError:{color:e.palette.error.main},displayInline:{display:"inline"},displayBlock:{display:"block"}}}),{name:"MuiTypography"})(y),A=c.forwardRef((function(e,t){return c.createElement(v,Object(d.a)({component:"p",variant:"body1",color:"textSecondary",ref:t},e))})),B=Object(p.a)({root:{marginBottom:12}},{name:"MuiDialogContentText"})(A),C=c.forwardRef((function(e,t){var r=e.disableSpacing,a=void 0!==r&&r,n=e.classes,o=e.className,i=Object(u.a)(e,["disableSpacing","classes","className"]);return c.createElement("div",Object(d.a)({className:Object(h.a)(n.root,o,!a&&n.spacing),ref:t},i))})),Q=Object(p.a)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiDialogActions"})(C),D=r(159),O=r(101),E=r(300),j=s.a.forwardRef((function(e,t){return s.a.createElement(E.a,Object.assign({direction:"down",ref:t},e))})),k=function(e){var t=e.children;return s.a.createElement("div",{className:"MuiDialog-paper MuiDialog-paperScrollPaper Dialog-bodyWrapper"},t)},w=function(e){Object(o.a)(r,e);var t=Object(i.a)(r);function r(e){var n;return Object(a.a)(this,r),(n=t.call(this,e)).state={props:{disableBackdropClick:!0,disableEscapeKeyDown:!0,TransitionComponent:j,keepMounted:!0}},n}return Object(n.a)(r,[{key:"render",value:function(){var e=this.props,t=e.classes,r=e.dialogProps,a=e.closeDialog,n=e.hiddenAgreeButton,o=e.otherTextProps,i=e.messageProps,c=e.disagreeButtonProps,d=e.agreeButtonProps,u=e.componentRender,h=this.state.props,p=Object.assign(h,r||{});return s.a.createElement(l.a,Object.assign({className:t.dialogForm,PaperComponent:k},p),s.a.createElement("div",{className:t.closeDialogIcon,onClick:a||c.handleDisagree},"X"),s.a.createElement(f,null,s.a.createElement(B,null,s.a.createElement("div",{style:{color:i&&i.color?i.color:"#46435a"}},i&&i.content?i.content:this.props.t("dialog.message")),o&&"object"===typeof o&&0!==Object.keys(o).length&&""!==o.content&&s.a.createElement("div",{className:t.otherText,style:{color:o.color?o.color:"#54516a"}},o.content),u||"")),s.a.createElement(Q,null,s.a.createElement(D.a,{onClick:c.handleDisagree,variant:"contained",style:{background:c&&c.background?c.background:"transparent",color:c&&c.color?c.color:"#46435a"}},c&&c.content?c.content:this.props.t("dialog.cancel")),n?"":s.a.createElement(D.a,{onClick:d.handleAgree,variant:"contained",autoFocus:!0,className:t.agreeButton,style:{background:d&&d.background?d.background:"#46435a",color:d&&d.color?d.color:"#08f1a9"}},d&&d.content?d.content:this.props.t("dialog.ok"))))}}]),r}(s.a.Component);t.a=Object(p.a)({dialogForm:{"& .MuiBackdrop-root":{backgroundColor:"rgba(189,189,217,0.71)"},"& .MuiDialog-paper":{minWidth:600,background:"#fff",borderRadius:22,margin:0,padding:"2.5rem 3rem",alignItems:"center","& .MuiDialogContent-root":{paddingTop:0,paddingBottom:"2rem","& .MuiDialogContentText-root":{color:"#46435a",fontWeight:600,fontSize:"1.8rem",textAlign:"center"}},"& .MuiDialogActions-root":{"& .MuiButtonBase-root":{background:"transparent",boxShadow:"none",border:"3px solid #46435a",borderRadius:19,color:"#46435a",fontSize:"1.7rem",textTransform:"lowercase",fontWeight:700,minWidth:250,"&$agreeButton":{background:"#46435a",color:"#08f1a9"},"&:hover":{background:"#2d2b3a!important",color:"#08f1a9!important",borderColor:"#2d2b3a"}}}}},closeDialogIcon:{position:"absolute",top:7,right:16,color:"#46435a",fontWeight:700,fontSize:"2rem",cursor:"pointer"},agreeButton:{},otherText:{fontSize:"1rem",marginTop:2}})(Object(O.a)()(w))}}]);
//# sourceMappingURL=5.2367b109.chunk.js.map