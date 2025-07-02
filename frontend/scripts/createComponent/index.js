const createTemplate = require('./templates/createTemplate')

const path = process.argv[2]
	.trim()
	.split('/')
	.filter((str) => str !== '')
const componentName = process.argv[3]

const layers = ['features', 'entities', 'pages', 'shared', 'app', 'widgets']
if (!path || !layers.includes(path[0])) {
	throw new Error(`Укажите путь из папок ${layers.join(' или ')}`)
}

if (!componentName) {
	throw new Error('Укажите название компонента')
}

createTemplate(path, componentName)
