
  let name   = document.querySelector('#name');
  let price  = document.querySelector('#price');
  let amount = document.querySelector('#amount');
  let add    = document.querySelector('#add');
  let tableProducts  = document.querySelector('#tableProducts');
  let total  = document.querySelector('#total');
  
  add.addEventListener('click', function() {
      let tr = document.createElement('tr');
      
    allowEdit(createCell(tr, name.value, 'name'));
    allowEdit(createCell(tr, price.value, 'price'));
    allowEdit(createCell(tr, amount.value, 'amount'));
      createCell(tr, price.value * amount.value, 'cost');
      createCell(tr, 'удалить', 'remove').addEventListener('click', function() {
      tr.remove();
      recountTotal();
    });
      
      tableProducts.appendChild(tr);
    recountTotal(); 
  });
  
  function createCell(tr, value, name) {
    td = document.createElement('td');
    td.textContent = value;
    td.classList.add(name);
    return tr.appendChild(td);
  } 
  
  function recountTotal() {
      let costs = tableProducts.querySelectorAll('.cost');
      
      if (costs) {
      let sum = 0;
      for(let i of costs){
        console.log(i);
        sum += +i.textContent;
      }
      total.textContent = sum;
      }
  }
  
  function allowEdit(td) {
    td.addEventListener('dblclick', function() {
          let text = td.textContent
          td.textContent = '';
          
          let input = document.createElement('input');
          input.value = text;
          input.focus();
          td.appendChild(input);
          
          input.addEventListener('keydown', function(event) {
              if (event.key == 'Enter') {
                  td.textContent = this.value;
                  
                  if (td.classList.contains('price') || td.classList.contains('amount')) {
                      let priceTr = td.parentElement.querySelector('.price').textContent;
                      let amountTr = td.parentElement.querySelector('.amount').textContent;
                      let costTr = td.parentElement.querySelector('.cost');
  
            costTr.textContent = +amountTr * +priceTr;
            
            recountTotal(); 
                  }
              }
          });
      });
  }