const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const createUI = require('./createUI')
const createPublicApi = require('./createPublicApi')

module.exports = async (path, componentName) => {
	try {
		await fs.mkdir(resolveRoot('src', ...path, componentName))
	} catch (e) {
		console.log(
			`не удалось создать директорию для компонента${componentName}`
		)
	}
	await createUI(path, componentName)
	await createPublicApi(path, componentName)
}
