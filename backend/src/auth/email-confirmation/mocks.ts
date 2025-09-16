const prismaMock = {
	token: {
		findUnique: jest.fn(),
		findFirst: jest.fn(),
		create: jest.fn(),
		delete: jest.fn()
	},
	user: {
		update: jest.fn()
	}
}

const mailMock = {
	sendConfirmationEmail: jest.fn()
}

const userMock = {
	findByEmail: jest.fn()
}

const authMock = {
	saveSession: jest.fn()
}

export { prismaMock, mailMock, userMock, authMock }
