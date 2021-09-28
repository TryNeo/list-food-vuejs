const app = new Vue(
    {
      el : '#app', // nombre
      data : {
        titulo : 'Listado de comidas - con VUE JS',
        comidas :  (JSON.parse(localStorage.getItem('datos')) != null ) ? JSON.parse(localStorage.getItem('datos')) : [] ,
        nuevaComida:'',
        nuevaDescription:'',
      },
      methods : {
        agregarComida(){
          if (this.nuevaComida === '' || this.nuevaDescription === ''){
                  Swal.fire({
                    icon: 'warning',
                    title: 'Campos vacios',
                    text: 'Verifica que los campos no se encuentre vacios',
                })
          }else{
              if(!this.comprobarComida(this.nuevaComida,this.nuevaDescription)){
                this.comidas.push({
                  'name_food':this.nuevaComida,
                  'description':this.nuevaDescription
                })
                localStorage.setItem('datos',JSON.stringify(this.comidas));
                $('#exampleModal').modal('hide');
                
                Swal.fire({
                    icon: 'success',
                    title: 'Exitoso',
                    text: 'Ha sido guardado exitosamente',
                })
              }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Valores ya existentes',
                    text: 'Estos valores ya se encuentran registrados',
                })
              }
          }
        },
        eliminarComida(val){
           this.comidas.forEach((item,index) =>{
             if(index === val){
                const parsed = this.comidas;
                parsed.splice(parsed.indexOf(index),val);
                localStorage.setItem("datos", JSON.stringify(parsed));
             };
           })
        }
        ,
        comprobarComida(value,value_two){
          let rep = []
          this.comidas.forEach((item)=>{
            if (item['name_food'] === value || item['description'] === value_two){
              rep.push(1);
            }
          })
          console.log(rep)
          return (rep.length === 0 )? false : true;
        },
      }
    }
  )