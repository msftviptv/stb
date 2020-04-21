const macList = document.querySelector('#mac-list');
const form = document.querySelector('#add-mac-form');

function rendermac(doc){
    let li = document.createElement('li');
    let mac = document.createElement('span');
    let cross = document.createElement('div');

        li.setAttribute('data-id', doc.id);
        mac.textContent = doc.data().mac;
        cross.textContent = 'x';

        li.appendChild(mac);
        li.appendChild(cross);

        macList.appendChild(li);
         // deleting data
 cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('kobraiptv').doc(id).delete();
});
}


//getting data
db.collection('kobraiptv').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        rendermac(doc);
    })
});


//saving data
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('kobraiptv').add({
        mac :form.mac.value
    });
    form.mac.value ='';
});
