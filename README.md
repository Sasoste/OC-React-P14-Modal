# HRNet Modal

A customizable and reusable react component of a modal written with TypeScript.

Install the package via npm : 

npm install hrnet-modal-2024

Props, type, default : 

isOpen : Boolean, false
onClose: () => void,
text: string, ""
fadeDuration: number, 300
closeOnOverlayClick: boolean, true
closeOnEscape: boolean, true
showCloseButton: boolean, true
closeButtonClass: string, ""
closeButtonText: string, "Close"
closeButtonPosition: 'top-right' or 'bottom-right', 'top-right'
className: string, ""
overlayClassName: string, ""
border: string, "none"
boxShadow: string, "none"
children: React.ReactNode, undefined
textStyle: React.CSSProperties, {}