export const authErrors = {
  OAuthSignin: 'Error in constructing an authorization URL.',
  OAuthCallback: 'Error in handling the response from an OAuth provider.',
  OAuthCreateAccount: 'Could not create OAuth provider user in the database.',
  EmailCreateAccount: 'Could not create email provider user in the database.',
  Callback: 'Error in the OAuth callback handler route.',
  OAuthAccountNotLinked:
    'This email is already linked to another OAuth account.',
  EmailSignin: 'Sending the e-mail with the verification token failed',
  CredentialsSignin: 'Error with the provided login credentials.',
  SessionRequired: 'You need to be signed in to access this page.',
  Default: 'Something went wrong.',
}
