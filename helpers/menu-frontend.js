const getMenuFrontEnd = ( role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Dashbaord',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main',  url: '/' },
            { titulo: 'Progresbar',  url: 'progress' },
            { titulo: 'Promesas',  url: 'promesas' },
            { titulo: 'Gráfica',  url: 'grafica1' },
            { titulo: 'RXJS',  url: 'rxjs' },
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            // { titulo: 'Usuairos',  url: 'usuarios' },
            { titulo: 'Hospitales',  url: 'hospitales' },
            { titulo: 'Médicos',  url: 'medicos' },
          ]
        },
      ];

      if ( role === 'ADMIN_ROLE' ) {
          menu[1].submenu.unshift({ titulo: 'Usuairos',  url: 'usuarios' });
      }
    
      return menu;

}


module.exports = {
    getMenuFrontEnd
}