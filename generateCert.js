const fs = require('fs');
const forge = require('node-forge');

const pki = forge.pki;

// Generate a key pair
const keys = pki.rsa.generateKeyPair(2048);

// Create certificate
const cert = pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

// Self-sign
const attrs = [{ name: 'commonName', value: 'localhost' }];
cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.sign(keys.privateKey);

// Convert to PEM
const certPem = pki.certificateToPem(cert);
const keyPem = pki.privateKeyToPem(keys.privateKey);

// Save to files
fs.writeFileSync('cert.pem', certPem);
fs.writeFileSync('key.pem', keyPem);

console.log('✅ Self-signed HTTPS certs generated: key.pem + cert.pem');
