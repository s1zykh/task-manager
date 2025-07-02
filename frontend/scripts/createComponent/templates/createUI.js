const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const firstCharUpperCase = require('../firstCharUpperCase')
const componentTemplate = require('./componentTemplate')
const storyTemplate = require('./storyTemplate')
const styleTemplate = require('./styleTemplate')

module.exports = async (path, componentName) => {
	const resolveUIPath = (...segments) =>
		resolveRoot('src', ...path, componentName, 'ui', ...segments)

	const createUIDir = async () => {
		try {
			await fs.mkdir(resolveUIPath())
		} catch (e) {
			console.log(`Не удалось создать UI директорию для ${componentName}`)
		}
	}

	const createComponent = async () => {
		try {
			const fileName = firstCharUpperCase(componentName)
			await fs.writeFile(
				resolveUIPath(`${fileName}.tsx`),
				componentTemplate(fileName)
			)
			await fs.writeFile(
				resolveUIPath(`${fileName}.stories.tsx`),
				storyTemplate(path[0], fileName)
			)
			await fs.writeFile(
				resolveUIPath(`${fileName}.module.css`),
				styleTemplate(fileName)
			)
		} catch (e) {
			console.log('Не удалось создать компонент')
		}
	}

	await createUIDir()
	await createComponent()
}
