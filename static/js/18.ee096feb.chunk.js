(this["webpackJsonpgame-caro"]=this["webpackJsonpgame-caro"]||[]).push([[18],{301:function(e,a,n){"use strict";n.r(a);var t=n(46),s=n(10),r=n(13),o=n(14),i=n(51),c=n(16),l=n(15),h=n(0),m=n.n(h),u=n(19),d=n(27),C=n(8),p=n(73),g=n(163),B=(n(74),n(72)),f=n(200),b=n(5),S=n(63),W=n(234),k=n(45),A=n(159),E=n(174),v=n(268),w=n(319),I=n(314),y=n(199),N=n.n(y),D=n(300),T=n(101),Y=m.a.forwardRef((function(e,a){return m.a.createElement(D.a,Object.assign({direction:"up",ref:a},e))})),j=function(e){Object(c.a)(n,e);var a=Object(l.a)(n);function n(e){var t;return Object(r.a)(this,n),(t=a.call(this,e)).state={openDialog:!1,showBoard:!1,setupBoardCheck:!1,dataBoardTrainingWithYourself:null,chessmanWin:null,setupBoard:{sizeChessBoard:10,iconChessmanA:null,iconChessmanB:null,firstTurn:b.d},menuSelectChessmanAIcon:null,menuSelectChessmanBIcon:null,checkShowChessman:!1,setupChessmanDone:!1},t.getDataBoardCurrent=t.getDataBoardCurrent.bind(Object(i.a)(t)),t.handleDisagree=t.handleDisagree.bind(Object(i.a)(t)),t.handleAgree=t.handleAgree.bind(Object(i.a)(t)),t.checkWinChessman=t.checkWinChessman.bind(Object(i.a)(t)),t.handleSetupBoardChange=t.handleSetupBoardChange.bind(Object(i.a)(t)),t.setupBoard=t.setupBoard.bind(Object(i.a)(t)),t.createNewChessBoard=t.createNewChessBoard.bind(Object(i.a)(t)),t.openMenuSelectChessmanAIcon=t.openMenuSelectChessmanAIcon.bind(Object(i.a)(t)),t.closeMenuSelectChessmanAIcon=t.closeMenuSelectChessmanAIcon.bind(Object(i.a)(t)),t.openMenuSelectChessmanBIcon=t.openMenuSelectChessmanBIcon.bind(Object(i.a)(t)),t.closeMenuSelectChessmanBIcon=t.closeMenuSelectChessmanBIcon.bind(Object(i.a)(t)),t}return Object(o.a)(n,[{key:"openMenuSelectChessmanAIcon",value:function(e){this.setState({menuSelectChessmanAIcon:e.currentTarget})}},{key:"closeMenuSelectChessmanAIcon",value:function(){this.setState({menuSelectChessmanAIcon:null})}},{key:"openMenuSelectChessmanBIcon",value:function(e){this.setState({menuSelectChessmanBIcon:e.currentTarget})}},{key:"closeMenuSelectChessmanBIcon",value:function(){this.setState({menuSelectChessmanBIcon:null})}},{key:"componentDidMount",value:function(){var e=this.props,a=e.dataBoardTrainingWithYourself,n=e.dataUserAuth;this.props.showDataChessmans(),a&&a.chessmanUserId===(n?n.uid:null)?this.setState({openDialog:!0}):this.setState({setupBoardCheck:!0})}},{key:"componentDidUpdate",value:function(e,a,n){var t=this.props,s=t.dataChessmans,r=t.dataBoardTrainingWithYourself,o=this.state,i=o.setupBoard,c=o.checkShowChessman,l=o.chessmanWin;s&&Array.isArray(s)&&s.length>=2&&!c&&(i.iconChessmanA=s[0],i.iconChessmanB=s[1],this.setState({checkShowChessman:!0,setupBoard:i})),l&&r&&this.props.saveDataBoardTrainingWithYourself(null)}},{key:"getDataBoardCurrent",value:function(e){this.props.saveDataBoardTrainingWithYourself(e)}},{key:"checkWinChessman",value:function(e){this.props.saveDataBoardTrainingWithYourself(null),this.setState({chessmanWin:e})}},{key:"handleDisagree",value:function(){this.props.saveDataBoardTrainingWithYourself(null),this.createNewChessBoard()}},{key:"handleAgree",value:function(){var e=this.state.setupBoard,a=this.props.dataBoardTrainingWithYourself;e.iconChessmanA=a.iconChessmanA,e.iconChessmanB=a.iconChessmanB,e.sizeChessBoard=a.sizeChessBoard,e.firstTurn=a.firstTurn,this.setState({openDialog:!1,showBoard:!0,dataBoardTrainingWithYourself:a,setupBoard:e})}},{key:"handleSetupBoardChange",value:function(e,a){var n=this.state.setupBoard;"iconChessmanA"===e?n.iconChessmanB&&a.chessmanId===n.iconChessmanB.chessmanId&&(n.iconChessmanB=null):"iconChessmanB"===e?n.iconChessmanA&&a.chessmanId===n.iconChessmanA.chessmanId&&(n.iconChessmanA=null):"sizeChessBoard"===e&&(a<10||a>20)&&(a=n.sizeChessBoard),this.setState({setupBoard:Object(s.a)(Object(s.a)({},n),{},Object(t.a)({},e,a)),menuSelectChessmanAIcon:null,menuSelectChessmanBIcon:null})}},{key:"setupBoard",value:function(){var e=this.state.setupBoard;e.sizeChessBoard&&e.sizeChessBoard>=10&&e.iconChessmanA&&e.iconChessmanB&&this.setState({showBoard:!0})}},{key:"createNewChessBoard",value:function(){this.setState({showBoard:!1,setupBoardCheck:!0,chessmanWin:null,setupBoard:{sizeChessBoard:10,iconChessmanA:null,iconChessmanB:null,firstTurn:b.d},checkShowChessman:!1,setupChessmanDone:!1,openDialog:!1,dataBoardTrainingWithYourself:null})}},{key:"render",value:function(){var e=this,a=this.state,n=a.openDialog,t=a.showBoard,s=a.dataBoardTrainingWithYourself,r=a.chessmanWin,o=a.setupBoard,i=a.setupBoardCheck,c=a.menuSelectChessmanAIcon,l=a.menuSelectChessmanBIcon,h=a.checkShowChessman,u=this.props,d=u.classes,C=u.dataUserAuth,S=u.dataChessmans;return m.a.createElement(m.a.Fragment,null,m.a.createElement(g.a,null),m.a.createElement(B.a,null,m.a.createElement("div",{className:d.trainingWithYourselfWrapper},m.a.createElement("div",{className:d.trainingHeader},k.a.t("trainingWithYourself.header")),i&&!t&&m.a.createElement("div",{className:d.setupBoardWrapper},m.a.createElement(E.a,{className:d.sizeInput,type:"number",name:"sizeChessBoard",value:o.sizeChessBoard,onChange:function(a){return e.handleSetupBoardChange("sizeChessBoard",a.target.value)},inputProps:{min:10,max:20}}),m.a.createElement("div",{className:d.selectChessman},m.a.createElement("span",{className:"title"},k.a.t("trainingWithYourself.setupBoard.selectChessmanA.title")),h&&m.a.createElement(A.a,{"aria-controls":"simple-menu",className:d.btnChessman,"aria-haspopup":"true",onClick:this.openMenuSelectChessmanAIcon},o&&o.iconChessmanA?m.a.createElement("div",{className:d.iconChessman},m.a.createElement("img",{src:o.iconChessmanA.chessmanUrl,alt:"",style:{width:50,height:50}}),m.a.createElement("span",null,o.iconChessmanA.name)):m.a.createElement("div",{className:d.notChessman},k.a.t("trainingWithYourself.setupBoard.selectChessmanA.title"))),c&&m.a.createElement(v.a,{id:"simple-menu",anchorEl:c,keepMounted:!0,open:!0,onClose:this.closeMenuSelectChessmanAIcon},S.map((function(a,n){return m.a.createElement(w.a,{onClick:function(){return e.handleSetupBoardChange("iconChessmanA",a)}},m.a.createElement("img",{src:a.chessmanUrl,alt:"",style:{width:48,height:48}}),m.a.createElement("span",null,a.name))})))),m.a.createElement("div",{className:d.selectChessman},m.a.createElement("span",{className:"title"},k.a.t("trainingWithYourself.setupBoard.selectChessmanB.title")),h&&m.a.createElement(A.a,{"aria-controls":"simple-menu",className:d.btnChessman,"aria-haspopup":"true",onClick:this.openMenuSelectChessmanBIcon},o&&o.iconChessmanB?m.a.createElement("div",{className:d.iconChessman},m.a.createElement("img",{src:o.iconChessmanB.chessmanUrl,alt:"",style:{width:50,height:50}}),m.a.createElement("span",null,o.iconChessmanB.name)):m.a.createElement("div",{className:d.notChessman},k.a.t("trainingWithYourself.setupBoard.selectChessmanB.title"))),l&&m.a.createElement(v.a,{id:"simple-menu",anchorEl:l,keepMounted:!0,open:!0,onClose:this.closeMenuSelectChessmanBIcon},S.map((function(a,n){return m.a.createElement(w.a,{onClick:function(){return e.handleSetupBoardChange("iconChessmanB",a)}},m.a.createElement("img",{src:a.chessmanUrl,alt:"",style:{width:50,height:50}}),m.a.createElement("span",null,a.name))})))),m.a.createElement(A.a,{className:d.btnSetupBoard,onClick:this.setupBoard},k.a.t("trainingWithYourself.setupBoard.btnSubmit"))),t&&m.a.createElement(f.a,{size:o.sizeChessBoard,chessmanA:b.d,chessmanB:b.e,firstTurn:o.firstTurn,chessmanUserId:C?C.uid:null,iconChessmanA:o.iconChessmanA,iconChessmanB:o.iconChessmanB,getDataBoardCurrent:this.getDataBoardCurrent,dataBoardTrainingDefault:s,checkWinChessman:this.checkWinChessman}))),m.a.createElement(p.a,null),m.a.createElement(W.a,{dialogProps:{open:n},messageProps:{content:k.a.t("trainingWithYourself.dialog.content_continue"),color:""},disagreeButtonProps:{handleDisagree:this.handleDisagree,background:"",content:k.a.t("trainingWithYourself.dialog.no")},agreeButtonProps:{handleAgree:this.handleAgree,background:"",content:k.a.t("trainingWithYourself.dialog.yes")}}),m.a.createElement(I.a,{className:d.dialogNotice,PaperProps:{style:{backgroundColor:"transparent",boxShadow:"none"}},fullScreen:!0,open:r&&o,TransitionComponent:Y},m.a.createElement("div",{className:d.winNoticeWrapper},m.a.createElement("img",{src:N.a,alt:""}),o&&o.iconChessmanA&&o.iconChessmanB&&m.a.createElement("div",{className:d.noticeWin},r===b.d?m.a.createElement(m.a.Fragment,null,m.a.createElement("img",{src:o.iconChessmanA.chessmanUrl,alt:""}),m.a.createElement("span",{className:"text"},k.a.t("trainingWithYourself.setupBoard.noticeWin.chessmanA"))):m.a.createElement(m.a.Fragment,null,m.a.createElement("img",{src:o.iconChessmanB.chessmanUrl,alt:""}),m.a.createElement("span",{className:"text"},k.a.t("trainingWithYourself.setupBoard.noticeWin.chessmanB")))),m.a.createElement(A.a,{className:d.btnNewChessBoard,onClick:this.createNewChessBoard},k.a.t("trainingWithYourself.setupBoard.noticeWin.newChessBoard")))))}}]),n}(m.a.Component);a.default=Object(C.d)(Object(u.b)((function(e){return{dataUserAuth:e.authReducer.dataUserAuth,dataChessmans:e.gameReducer.dataChessmans,dataBoardTrainingWithYourself:e.gameReducer.dataBoardTrainingWithYourself}}),(function(e){return{saveDataBoardTrainingWithYourself:function(a){return e(S.b(a))},showDataChessmans:function(){return e(S.h())}}})),Object(d.a)((function(e){return{trainingWithYourselfWrapper:{display:"flex",alignItems:"center",justifyContent:"flex-start",height:"100%",flexDirection:"column",overflowY:"scroll",backgroundColor:"#e0ece4",borderRadius:9,margin:"0.5rem 1rem","&::-webkit-scrollbar":{width:9,height:9},"&::-webkit-scrollbar-track":{},"&::-webkit-scrollbar-thumb":{borderRadius:9,background:"#ee6f57"}},noticeWin:{display:"flex",alignItems:"center",justifyContent:"center",padding:"0.5rem","& img":{width:48,height:48,borderRadius:11},"& .text":{color:"#81b214",fontSize:"0.9rem",fontWeight:600,paddingLeft:"0.5rem"}},trainingHeader:{color:"#123152",width:"100%",fontSize:"1.2rem",textAlign:"center",fontWeight:700,padding:"1rem 0rem"},btnNewChessBoard:{backgroundColor:"#123152",textTransform:"initial",padding:"0.5rem 1.5rem",fontWeight:600,borderRadius:9,margin:"0.5rem 0rem",color:"#fff","&:hover":{backgroundColor:"#123152"}},sizeInput:{width:"100%"},setupBoardWrapper:{},btnSetupBoard:{backgroundColor:"#123152",textTransform:"initial",padding:"0.5rem 1.5rem",fontWeight:600,borderRadius:9,marginTop:"1rem",color:"#fff",width:"100%","&:hover":{backgroundColor:"#123152"}},selectChessman:{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start","& .title":{color:"#123152",width:"100%",padding:"0.5rem 0rem",fontSize:"0.9rem",fontWeight:600}},notChessman:{color:"#ffdead"},btnChessman:{backgroundColor:"#123152",textTransform:"initial",padding:"0.5rem 1.5rem",fontWeight:600,borderRadius:9,marginTop:"0.25rem",width:"100%","&:hover":{backgroundColor:"#123152"}},iconChessman:{display:"flex",alignItems:"center",width:"100%","& img":{width:48,height:48,border:"1px solid #fff",borderRadius:9},"& span":{fontWeight:600,paddingLeft:"0.5rem",color:"#ffdead"}},dialogNotice:{backgroundColor:"rgb(251, 236, 236, 0.3)"},winNoticeWrapper:{backgroundColor:"rgb(251, 236, 236, 0.3)",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}})),Object(T.a)())(j)}}]);
//# sourceMappingURL=18.ee096feb.chunk.js.map