This is the encryption tool used to encrypt configuration property values for CCA. It is based off of the command line
tools that are part of the jasypt.org project, version 1.9.0.

Here is the official jasypt documentation for the command line tools: http://jasypt.org/cli.html


The BouncyCastle (http://bouncycastle.org) provider jar has been included, and by default specified as a provider for all of the command line tools.
The default algorithm used for encryption is PBEWithSHA256And256BITAES-CBC-BC, and need not be specified
on the command line.


Usage:

To encrypt, use encrypt.sh or encrypt.bat like so:

encrypt.sh input="Message to encrypt, usually a username or password" password=master-config-password-for-the-target-environment



Typically, you will only be using this tool to encrypt, however, you can also use decrypt.sh or decrypt.bat to decrypt values, like so:

decrypt.sh input=encrypted-value-that-looks-base64-encoded password=master-config-password-for-the-target-environment



