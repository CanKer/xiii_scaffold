
# IAM Role for GitHub OIDC

Create an IAM Role that GitHub Actions can assume via OIDC.

1. **Create OIDC provider** (once per account):
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`

2. **Create role** `github-oidc-deployer` with the trust policy (`infra/iam/trust-policy.json`). Replace placeholders:
   - `<ACCOUNT_ID>`, `<GITHUB_OWNER>`, `<GITHUB_REPO>`

3. **Attach permissions** (`infra/iam/permissions-policy.json`) to the role.

4. Update the workflow:
   - `role-to-assume: arn:aws:iam::<ACCOUNT_ID>:role/github-oidc-deployer`

## Example CLI
```bash
ACCOUNT_ID=123456789012
OWNER=myorg
REPO=telegram-bot-hex-lambda

aws iam create-role   --role-name github-oidc-deployer   --assume-role-policy-document file://infra/iam/trust-policy.json

aws iam put-role-policy   --role-name github-oidc-deployer   --policy-name serverless-deploy   --policy-document file://infra/iam/permissions-policy.json
```
