const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const firstCharUpperCase = require('../firstCharUpperCase')

module.exports = async (path, componentName) => {
	const fileName = firstCharUpperCase(componentName)
	try {
		await fs.writeFile(
			resolveRoot('src', ...path, componentName, 'index.ts'),
			`export { ${fileName} } from './ui/${fileName}';`
		)
	} catch (e) {
		console.log('Не удалось создать PUBLIC API')
	}
}
