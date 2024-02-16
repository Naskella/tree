const servicesWithChildren = services.map(elem => {
    if(elem.node) return { ...elem, children: []}
    return {...elem}
})

const sorted = ((a, b) => a.sorthead - b.sorthead)

servicesWithChildren.forEach(elem => {
    const findChildren = servicesWithChildren.find(child => child.id === elem.head)
    if(findChildren){
        findChildren.children.push(elem)
        findChildren.children.sort(sorted)
    }
})

const result = servicesWithChildren.filter(elem => !elem.head || elem.node && !elem.head).sort(sorted)

const root = document.getElementById('root')

const createSubElement = (elem, parentElement) => {
    const li = document.createElement('li')
    if(elem.head) li.classList.add('display-none')
    li.classList.add('click')
    if(elem.head) li.style.marginLeft = '40px'
    li.textContent = `${elem.name} (${elem.price})`
    if(elem.node) {
        parentElement.appendChild(li)
        elem.children.forEach(child => {
            createSubElement(child, li)
        })
        return
    }
    li.classList.remove('click')
    parentElement.appendChild(li)
}

result.forEach(elem => {
   createSubElement(elem, root)
})

const allLi = document.querySelectorAll('li')

allLi.forEach(elem => {
    const childrenArr = Array.from(elem.children)
    elem.addEventListener('click', (event) => {
        if(event.target === elem){
            childrenArr.forEach(elem => {
                elem.classList.toggle('display-none')
            })
        }
    })
})