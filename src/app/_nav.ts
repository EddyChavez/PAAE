// import {{}} from './';

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: any;
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
}

// name? = nameSistem [];

let sistemas = JSON.parse(sessionStorage.permisos);

var rutasSistemas = [];

for(var sistema in sistemas[0].SISTEMAS){
  var rutasRoles = [];
  //console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
  for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
    var rutasModulos = [];
    //console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
    for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
      //console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
      rutasModulos.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE,
                      url: '/'+sistemas[0].SISTEMAS[sistema].NOMBRE+'/'+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE, 
                      icon: 'icon-cursor'});
    }
    rutasRoles.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE, 
                    icon: 'icon-screen-desktop', 
                    children: rutasModulos});  
  }
  rutasSistemas.push({name: sistemas[0].SISTEMAS[sistema].NOMBRE, 
                      url: '/'+sistemas[0].SISTEMAS[sistema].NOMBRE, 
                      icon: 'icon-star', 
                      children: rutasRoles});
}

//console.log(rutasSistemas); 
export const navItems: NavData[] = (rutasSistemas);