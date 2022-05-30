import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'
const client = new SecretsManagerClient({ region: 'ap-northeast-2' })

interface SecretDbModel {
	dbClusterIdentifier: string,
	password: string,
	dbname: string,
	engine: string,
	port: number,
	host: string,
	username: string
}
export class SecretManager {
	async getDbInfo(): Promise<SecretDbModel> {
		const params = {
			SecretId: 'arn:aws:secretsmanager:ap-northeast-2:107835905686:secret:recruitAuroraClusterCredentials-nBlcGO'
		}
		const command = new GetSecretValueCommand(params)
		const data = await client.send(command)
		const secret = data.SecretString
		return JSON.parse(secret)
	}
}

