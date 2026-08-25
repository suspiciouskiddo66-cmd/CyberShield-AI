// Curated educational dataset of 100 simulated & neutralized malicious link examples
// Category Color Tags:
// - Red: Phishing
// - Orange: Malware
// - Yellow: Suspicious
// - Green: Fake Offers / E-Commerce Scam

export const MALICIOUS_EXAMPLES = [
  // ================= PHISHING (Red Tag) =================
  {
    id: 'phish-001',
    url: 'https://paypal-security-verification.top/auth/login.php?session=928347',
    category: 'phishing',
    brand: 'PayPal Credential Harvester',
    attackVector: 'Credential Theft & 2FA Interception',
    threatDescription: 'Spoofs official PayPal layout to capture email, password, and credit card security PINs.',
    redFlags: ['Abusive .top TLD', 'Excessive subdomains', 'Brand name used in domain path'],
    riskScore: 96
  },
  {
    id: 'phish-002',
    url: 'https://appleid-support-recover-account.xyz/manage/verify.html',
    category: 'phishing',
    brand: 'Apple ID Impersonation',
    attackVector: 'iCloud Account Takeover',
    threatDescription: 'Presents a fake locked iCloud alert urging users to input Apple ID and recovery keys.',
    redFlags: ['.xyz low-cost TLD', 'Urgency keyword "recover-account"', 'No genuine Apple SSL cert'],
    riskScore: 94
  },
  {
    id: 'phish-003',
    url: 'https://chase-bank-online-security.center/signin/auth-gate.aspx',
    category: 'phishing',
    brand: 'Chase Banking Phish',
    attackVector: 'Online Banking Hijacking',
    threatDescription: 'Counterfeits Chase retail banking portal to collect account numbers and SSN.',
    redFlags: ['Unusual .center TLD', 'Hyphenated domain structure', 'Spoofed login forms'],
    riskScore: 98
  },
  {
    id: 'phish-004',
    url: 'https://metamask-extension-seed-recovery.icu/connect-wallet.php',
    category: 'phishing',
    brand: 'MetaMask Wallet Drainer',
    attackVector: 'Secret Recovery Phrase Theft',
    threatDescription: 'Prompts users to enter their 12-word secret seed phrase under the guise of an urgent extension update.',
    redFlags: ['.icu high-risk TLD', 'Direct seed phrase prompt', 'Lookalike crypto layout'],
    riskScore: 99
  },
  {
    id: 'phish-005',
    url: 'https://microsoft-office365-login-verify.work/owa/auth/logon.aspx',
    category: 'phishing',
    brand: 'Microsoft 365 OWA Phish',
    attackVector: 'Corporate Email Compromise (BEC)',
    threatDescription: 'Clones Outlook Web Access to compromise enterprise enterprise corporate accounts.',
    redFlags: ['.work TLD used for enterprise auth', 'Embedded brand in subpath'],
    riskScore: 92
  },
  {
    id: 'phish-006',
    url: 'https://netflix-billing-update-required.buzz/account/payment',
    category: 'phishing',
    brand: 'Netflix Billing Scam',
    attackVector: 'Credit Card Skimming',
    threatDescription: 'Claims account is suspended due to billing failure and demands immediate card re-entry.',
    redFlags: ['.buzz TLD', 'Urgency trigger "update-required"', 'Credit card harvesting payload'],
    riskScore: 90
  },
  {
    id: 'phish-007',
    url: 'https://google-docs-shared-invoice-verify.tk/drive/view?id=4921',
    category: 'phishing',
    brand: 'Google Drive Doc Spoof',
    attackVector: 'Google Account Harvesting',
    threatDescription: 'Displays fake Google Drive shared invoice requiring user to log in with Google credentials.',
    redFlags: ['.tk free abusive TLD', 'Deceptive document sharing lure'],
    riskScore: 93
  },
  {
    id: 'phish-008',
    url: 'https://binance-kyc-compliance-alert.space/login?ref=kyc99',
    category: 'phishing',
    brand: 'Binance Exchange Phish',
    attackVector: 'Crypto Asset Exfiltration',
    threatDescription: 'Threatens account termination unless user logs in to complete urgent KYC verification.',
    redFlags: ['.space TLD', 'Fear-based compliance messaging', 'Fake 2FA token prompt'],
    riskScore: 95
  },
  {
    id: 'phish-009',
    url: 'https://wellsfargo-secure-authentication.cam/signon/index.jsp',
    category: 'phishing',
    brand: 'Wells Fargo Portal Clone',
    attackVector: 'Financial Credential Theft',
    threatDescription: 'Replicates Wells Fargo customer portal with credential interception hooks.',
    redFlags: ['.cam TLD', 'Non-authoritative banking domain', 'Phishing form fields'],
    riskScore: 97
  },
  {
    id: 'phish-010',
    url: 'https://instagram-copyright-infringement-appeal.rest/form.php',
    category: 'phishing',
    brand: 'Instagram Copyright Trap',
    attackVector: 'Social Media Account Takeover',
    threatDescription: 'Falsely informs user of a copyright violation, linking to a credential harvesting form.',
    redFlags: ['.rest TLD', 'Bogus legal appeal lure', 'Demands Instagram password'],
    riskScore: 89
  },
  {
    id: 'phish-011',
    url: 'https://facebook-meta-business-manager-review.buzz/support/appeal',
    category: 'phishing',
    brand: 'Meta Business Manager Spoof',
    attackVector: 'Ad Account & Page Hijack',
    threatDescription: 'Targets social media managers claiming ad accounts will be disabled within 24 hours.',
    redFlags: ['.buzz TLD', 'Urgency timer countdown', 'Targets administrative credentials'],
    riskScore: 92
  },
  {
    id: 'phish-012',
    url: 'https://coinbase-pro-security-lockout.live/oauth/authorize',
    category: 'phishing',
    brand: 'Coinbase Pro Hijack',
    attackVector: 'API Key & Wallet Theft',
    threatDescription: 'Prompts users to enter 2FA SMS codes to unlock an alleged restricted account.',
    redFlags: ['.live TLD', 'Real-time OTP relay proxy attack', 'Unauthorized OAuth endpoint'],
    riskScore: 98
  },
  {
    id: 'phish-013',
    url: 'https://amazon-prime-renewal-billing.monster/order/review.php',
    category: 'phishing',
    brand: 'Amazon Prime Renewal Lure',
    attackVector: 'Payment Card Theft',
    threatDescription: 'Sends fake $499 Prime renewal receipt with an urgent cancellation link harvesting credit card info.',
    redFlags: ['.monster TLD', 'Receipt cancellation lure', 'Spoofed Amazon header'],
    riskScore: 91
  },
  {
    id: 'phish-014',
    url: 'https://linkedin-message-notification-alert.click/inbox/view',
    category: 'phishing',
    brand: 'LinkedIn Message Bait',
    attackVector: 'Professional Account Theft',
    threatDescription: 'Mimics LinkedIn recruiter messaging notification requiring credential re-authentication.',
    redFlags: ['.click TLD', 'Imitation recruiter lure', 'Harvests corporate logins'],
    riskScore: 88
  },
  {
    id: 'phish-015',
    url: 'https://steamcommunity-gift-trade-offer.link/trade/accept?id=9302',
    category: 'phishing',
    brand: 'Steam Inventory Hijack',
    attackVector: 'Gaming Account & Skin Theft',
    threatDescription: 'Tricks gamers with a fake trade offer link that steals Steam Guard authentication sessions.',
    redFlags: ['.link TLD', 'Spoofed Steam OpenID login', 'Session hijacking scripts'],
    riskScore: 93
  },
  {
    id: 'phish-016',
    url: 'https://bankofamerica-safe-pass-upgrade.icu/online-id/login',
    category: 'phishing',
    brand: 'Bank of America SafePass Spoof',
    attackVector: 'Wire Transfer Authorization Theft',
    threatDescription: 'Solicits SafePass security codes to facilitate fraudulent wire transfers.',
    redFlags: ['.icu TLD', 'Targets SafePass SMS codes', 'Forged banking UI'],
    riskScore: 97
  },
  {
    id: 'phish-017',
    url: 'https://dhl-express-package-redelivery-fee.work/tracking/pay.php',
    category: 'phishing',
    brand: 'DHL Package Redelivery Scam',
    attackVector: 'Postal Fee Phishing & Card Theft',
    threatDescription: 'Claims a parcel cannot be delivered without paying a $1.99 redelivery fee.',
    redFlags: ['.work TLD', 'Delivery failure lure', 'Collects full card numbers and CVV'],
    riskScore: 90
  },
  {
    id: 'phish-018',
    url: 'https://usps-tracking-address-confirmation.top/schedule/redelivery',
    category: 'phishing',
    brand: 'USPS Smishing Trap',
    attackVector: 'Postal Credential & Card Skimming',
    threatDescription: 'Sent via SMS smishing directing victims to confirm home address and payment info.',
    redFlags: ['.top TLD', 'Common smishing pattern', 'Harvests personal identity data'],
    riskScore: 92
  },
  {
    id: 'phish-019',
    url: 'https://dropbox-shared-legal-document.kim/download/file-view',
    category: 'phishing',
    brand: 'Dropbox Document Lure',
    attackVector: 'Corporate Single Sign-On Theft',
    threatDescription: 'Claims an urgent NDA or legal contract is ready for view via Dropbox SSO.',
    redFlags: ['.kim TLD', 'SSO credential interceptor', 'Fake PDF preview overlay'],
    riskScore: 91
  },
  {
    id: 'phish-020',
    url: 'https://discord-nitro-free-claim-gift.rest/activation/nitro',
    category: 'phishing',
    brand: 'Discord Nitro Token Stealer',
    attackVector: 'Discord Token Exfiltration',
    threatDescription: 'Promises 3 months of free Discord Nitro, executing a QR code login token stealer.',
    redFlags: ['.rest TLD', 'QR code phishing (Qshing)', 'Extracts Discord auth token'],
    riskScore: 94
  },
  {
    id: 'phish-021',
    url: 'https://telegram-web-login-session-restore.cc/auth/qr',
    category: 'phishing',
    brand: 'Telegram Session Hijack',
    attackVector: 'Telegram Account Takeover',
    threatDescription: 'Presents a rogue Telegram Web QR code to gain full access to chats and contacts.',
    redFlags: ['.cc TLD', 'QR session takeover', 'Unauthorized Web Telegram proxy'],
    riskScore: 95
  },
  {
    id: 'phish-022',
    url: 'https://whatsapp-web-desktop-sync.stream/verify-phone',
    category: 'phishing',
    brand: 'WhatsApp Multi-Device Spoof',
    attackVector: 'Chat History Exfiltration',
    threatDescription: 'Requests phone number and 6-digit sync code under the guise of an updated Web client.',
    redFlags: ['.stream TLD', 'Phishes 6-digit WhatsApp registration code'],
    riskScore: 93
  },
  {
    id: 'phish-023',
    url: 'https://spotify-family-plan-invitation.party/join/accept-invite',
    category: 'phishing',
    brand: 'Spotify Account Harvester',
    attackVector: 'Credential & Family Plan Hijack',
    threatDescription: 'Invites users to join a premium family plan to harvest Spotify login details.',
    redFlags: ['.party TLD', 'Social engineering incentive', 'Credential dump script'],
    riskScore: 87
  },
  {
    id: 'phish-024',
    url: 'https://fedex-customs-clearance-tax.cam/invoice/duty-payment',
    category: 'phishing',
    brand: 'FedEx Customs Phish',
    attackVector: 'Financial Payment Interception',
    threatDescription: 'Demands payment of customs clearance tax for an international shipment.',
    redFlags: ['.cam TLD', 'Pressure-based customs alert', 'Credit card harvesting form'],
    riskScore: 89
  },
  {
    id: 'phish-025',
    url: 'https://zoom-video-meeting-invitation-join.men/meeting/room?id=8831',
    category: 'phishing',
    brand: 'Zoom Meeting Invitation Lure',
    attackVector: 'Corporate SSO Phishing',
    threatDescription: 'Invites employees to a mandatory CEO Zoom meeting requiring SSO login.',
    redFlags: ['.men TLD', 'Impersonates internal leadership', 'SSO credential interceptor'],
    riskScore: 92
  },

  // ================= MALWARE (Orange Tag) =================
  {
    id: 'mal-001',
    url: 'http://185.220.101.5:8080/downloads/windows_patch_kb9401.exe',
    category: 'malware',
    brand: 'Rogue IP Binary Payload',
    attackVector: 'Trojan Dropper / Direct Execution',
    threatDescription: 'Direct raw IP server distributing an obfuscated Trojan downloader disguised as a Windows update.',
    redFlags: ['Raw IP hosting', 'Non-standard port :8080', 'Direct executable (.exe) payload'],
    riskScore: 98
  },
  {
    id: 'mal-002',
    url: 'http://194.26.29.122:4444/payloads/cobaltstrike_beacon.bin',
    category: 'malware',
    brand: 'Cobalt Strike C2 Beacon',
    attackVector: 'Command & Control Stage-1 Loader',
    threatDescription: 'Raw IP hosting an active Cobalt Strike stager binary for remote enterprise compromise.',
    redFlags: ['Hostile port :4444', 'Raw IP address', 'Known binary payload signature'],
    riskScore: 100
  },
  {
    id: 'mal-003',
    url: 'https://cdn-adobe-flash-player-installer.xyz/setup_x64.msi',
    category: 'malware',
    brand: 'Fake Flash Installer / InfoStealer',
    attackVector: 'RedLine / Vidar InfoStealer Delivery',
    threatDescription: 'Prompts users to download a fake player update that drops RedLine InfoStealer malware.',
    redFlags: ['Deprecated technology lure (Flash)', '.msi installer payload', '.xyz TLD'],
    riskScore: 95
  },
  {
    id: 'mal-004',
    url: 'http://91.240.118.42/scripts/powershell_dropper.ps1',
    category: 'malware',
    brand: 'Fileless PowerShell Dropper',
    attackVector: 'Memory-Only Execution',
    threatDescription: 'Serves an encoded PowerShell script that pulls stage-2 ransomware into RAM.',
    redFlags: ['Raw IP address hosting', 'Direct .ps1 script file', 'Unauthenticated HTTP'],
    riskScore: 97
  },
  {
    id: 'mal-005',
    url: 'https://nvidia-geforce-driver-optimizer.top/download/GFExperience.exe',
    category: 'malware',
    brand: 'Trojanized GPU Driver',
    attackVector: 'Crypto Miner / Botnet Agent',
    threatDescription: 'Bundles an XMRig cryptocurrency miner inside a repackaged NVIDIA GPU driver installer.',
    redFlags: ['.top suspicious TLD', 'Executable download from non-OEM source', 'High file entropy'],
    riskScore: 94
  },
  {
    id: 'mal-006',
    url: 'http://193.106.191.76:9999/bot/gate.php?bot_id=win11_victim',
    category: 'malware',
    brand: 'Mirai / Mozi Botnet C2 Node',
    attackVector: 'Botnet Check-In & DDoS Coordination',
    threatDescription: 'Active command-and-control gate endpoint receiving telemetry from infected endpoints.',
    redFlags: ['Raw IP address', 'High port :9999', 'Bot registration query parameters'],
    riskScore: 99
  },
  {
    id: 'mal-007',
    url: 'https://chrome-browser-security-patch.buzz/update/chrome_patch.vbs',
    category: 'malware',
    brand: 'VBScript Drive-By Downloader',
    attackVector: 'VBScript Execution & Registry Persistence',
    threatDescription: 'Delivers a malicious VBScript that establishes registry persistence and downloads payloads.',
    redFlags: ['.buzz TLD', '.vbs script file download', 'Fake browser patch branding'],
    riskScore: 93
  },
  {
    id: 'mal-008',
    url: 'http://45.154.255.89:8000/dropper/invoice_scan_0481.pdf.exe',
    category: 'malware',
    brand: 'Double Extension Trojan',
    attackVector: 'Double Extension File Obfuscation',
    threatDescription: 'Uses double extension trick (.pdf.exe) to trick users into executing malicious code.',
    redFlags: ['Double extension .pdf.exe', 'Raw IP server', 'Obvious deception tactic'],
    riskScore: 96
  },
  {
    id: 'mal-009',
    url: 'https://anydesk-remote-support-download.icu/AnyDesk_Installer.iso',
    category: 'malware',
    brand: 'Malicious ISO Container',
    attackVector: 'Mark-of-the-Web (MOTW) Bypass',
    threatDescription: 'Distributes an ISO disk image containing LNK shortcuts and hidden DLL side-loading payloads.',
    redFlags: ['.iso container file payload', '.icu TLD', 'Impersonates AnyDesk remote tool'],
    riskScore: 95
  },
  {
    id: 'mal-010',
    url: 'http://103.145.13.62/payloads/ransomware_decryptor_key.bat',
    category: 'malware',
    brand: 'Ransomware Double Trap',
    attackVector: 'Secondary Destructive Wiper',
    threatDescription: 'Disguised as a decryption tool for ransomware victims, it deploys a secondary wiper payload.',
    redFlags: ['Raw IP address', '.bat batch script payload', 'Malicious extortion context'],
    riskScore: 98
  },
  {
    id: 'mal-011',
    url: 'https://telegram-desktop-installer-mod.xyz/Telegram_Premium_Crack.rar',
    category: 'malware',
    brand: 'Trojanized Software Crack',
    attackVector: 'Archive Password-Protected Malware',
    threatDescription: 'Compressed archive containing an encrypted password-stealing binary designed to evade antivirus.',
    redFlags: ['.xyz TLD', 'Pirated/Cracked software lure', 'High archive entropy'],
    riskScore: 92
  },
  {
    id: 'mal-012',
    url: 'http://178.62.204.101:8888/agent/connect?auth=d83f9a',
    category: 'malware',
    brand: 'Sliver C2 Remote Shell',
    attackVector: 'Post-Exploitation Command Channel',
    threatDescription: 'Interactive shell beacon point for Sliver post-exploitation framework.',
    redFlags: ['Raw IP node', 'Non-standard port :8888', 'C2 authentication payload'],
    riskScore: 99
  },
  {
    id: 'mal-013',
    url: 'https://vlc-media-player-codecs-pack.work/download/vlc_codecs.exe',
    category: 'malware',
    brand: 'Fake Codec Pack Installer',
    attackVector: 'Adware & Backdoor Bundler',
    threatDescription: 'Claims missing video codecs are required to view a video, installing a persistent backdoor.',
    redFlags: ['.work TLD', 'Classic fake codec social engineering', 'Executable bundle'],
    riskScore: 91
  },
  {
    id: 'mal-014',
    url: 'http://185.196.8.242/miner/xmrig_stealth_v6.sh',
    category: 'malware',
    brand: 'Linux Bash Crypto Miner',
    attackVector: 'Linux Server SSH Compromise',
    threatDescription: 'Shell script that terminates competing miners and runs Monero mining in background.',
    redFlags: ['Raw IP address', 'Direct Linux .sh script', 'Malicious cryptomining code'],
    riskScore: 94
  },
  {
    id: 'mal-015',
    url: 'https://microsoft-teams-meeting-plugin.top/setup/teams_addon.msi',
    category: 'malware',
    brand: 'Fake Teams Addon Dropper',
    attackVector: 'DLL Hijacking / InfoStealer',
    threatDescription: 'Drops a malicious DLL that hooks browser memory to steal stored cookies and passwords.',
    redFlags: ['.top TLD', 'Spoofed Microsoft collaboration addon', '.msi payload'],
    riskScore: 93
  },
  {
    id: 'mal-016',
    url: 'http://195.123.246.10:8080/rat/AsyncRAT_Client_v0.5.exe',
    category: 'malware',
    brand: 'AsyncRAT Remote Access Trojan',
    attackVector: 'Remote Access / Keylogger / WebCam',
    threatDescription: 'Standalone AsyncRAT remote access client providing attackers full remote desktop control.',
    redFlags: ['Raw IP address', 'Port :8080', 'Direct RAT client delivery'],
    riskScore: 100
  },
  {
    id: 'mal-017',
    url: 'https://chatgpt-desktop-ai-assistant.buzz/download/ChatGPT_x64.exe',
    category: 'malware',
    brand: 'Fake ChatGPT AI Client',
    attackVector: 'Meta/Facebook Ad Account Stealer',
    threatDescription: 'Promoted via rogue Facebook ads, dropping malware specifically tuned to steal Facebook Business cookies.',
    redFlags: ['.buzz TLD', 'Unofficial client download', 'Targets session cookies'],
    riskScore: 95
  },
  {
    id: 'mal-018',
    url: 'http://185.180.143.12:9000/loader/stage1.dll',
    category: 'malware',
    brand: 'Qakbot / Qbot DLL Stager',
    attackVector: 'DLL Injection & Process Hollowing',
    threatDescription: 'Serves encrypted DLL stager utilized in multi-stage banking trojan campaigns.',
    redFlags: ['Raw IP host', 'Direct .dll download', 'Non-standard port :9000'],
    riskScore: 99
  },
  {
    id: 'mal-019',
    url: 'https://discord-nitro-generator-unlimited.rest/nitro_gen.exe',
    category: 'malware',
    brand: 'Fake Token Generator / Clipper',
    attackVector: 'Crypto Clipboard Hijacker (Clipper)',
    threatDescription: 'Monitors clipboard for Bitcoin/Ethereum addresses and replaces them with attacker addresses.',
    redFlags: ['.rest TLD', 'Generator tool lure', 'Crypto clipboard hijacking'],
    riskScore: 96
  },
  {
    id: 'mal-020',
    url: 'http://194.38.20.155/ransom/lockbit_encryptor.exe',
    category: 'malware',
    brand: 'LockBit 3.0 Ransomware Build',
    attackVector: 'High-Speed File Encryption',
    threatDescription: 'Direct binary download of LockBit ransomware builder targeting unpatched servers.',
    redFlags: ['Raw IP address', 'Ransomware executable', 'High-severity risk'],
    riskScore: 100
  },
  {
    id: 'mal-021',
    url: 'https://roblox-robux-unlimited-generator.men/robux_tool.exe',
    category: 'malware',
    brand: 'Fake Game Currency Generator',
    attackVector: 'Discord Webhook Credential Exfiltration',
    threatDescription: 'Targets younger gamers with fake Robux generator while exfiltrating browser logins via Discord webhook.',
    redFlags: ['.men TLD', 'Fake currency generator lure', 'Data exfiltration scripts'],
    riskScore: 92
  },
  {
    id: 'mal-022',
    url: 'http://185.244.213.88:8080/agent/beacon.php?id=srv_win',
    category: 'malware',
    brand: 'Meterpreter HTTP Handler',
    attackVector: 'Metasploit Reverse Shell',
    threatDescription: 'Active Metasploit Meterpreter reverse HTTP payload endpoint.',
    redFlags: ['Raw IP', 'Meterpreter beacon pattern', 'Active reverse shell handler'],
    riskScore: 100
  },
  {
    id: 'mal-023',
    url: 'https://nordvpn-free-account-generator.top/NordVPN_Crack.exe',
    category: 'malware',
    brand: 'Trojanized VPN Installer',
    attackVector: 'MITM Proxy Installation',
    threatDescription: 'Installs rogue root SSL certificates and routes user traffic through attacker proxy servers.',
    redFlags: ['.top TLD', 'Pirated VPN lure', 'Installs malicious root certificates'],
    riskScore: 96
  },
  {
    id: 'mal-024',
    url: 'http://45.95.169.13/stealer/raccoon_stealer_v2.bin',
    category: 'malware',
    brand: 'Raccoon InfoStealer v2',
    attackVector: 'Automated Wallet & Credential Grabbing',
    threatDescription: 'Automated info-stealer targeting 30+ browser types and cold crypto wallets.',
    redFlags: ['Raw IP address', 'Binary stealer payload', 'Zero-reputation host'],
    riskScore: 99
  },
  {
    id: 'mal-025',
    url: 'https://winrar-free-lifetime-license.click/download/winrar_key.bat',
    category: 'malware',
    brand: 'WinRAR License Activator Worm',
    attackVector: 'Network Worm Propagation',
    threatDescription: 'Batch script that infects network shares and disables Windows Defender real-time monitoring.',
    redFlags: ['.click TLD', '.bat script payload', 'Disables OS security settings'],
    riskScore: 94
  },

  // ================= SUSPICIOUS (Yellow Tag) =================
  {
    id: 'susp-001',
    url: 'https://bit.ly/3xY9kL2?redirect=http://unverified-crypto-airdrop.xyz/claim',
    category: 'suspicious',
    brand: 'Nested Shortener Redirection',
    attackVector: 'Open Redirection / Cloaking',
    threatDescription: 'Uses bit.ly URL shortener to hide an open redirect pointing to an unverified crypto claim portal.',
    redFlags: ['URL shortener masking', 'Redirect parameter query', 'Target uses .xyz TLD'],
    riskScore: 68
  },
  {
    id: 'susp-002',
    url: 'https://tinyurl.com/k93jfa29?destination=http://185.220.101.5/verify',
    category: 'suspicious',
    brand: 'Cloaked IP Destination',
    attackVector: 'Direct IP Redirection Bypass',
    threatDescription: 'Shortened link that resolves directly to a raw IP address, bypassing corporate email filters.',
    redFlags: ['Shortener cloaking', 'Underlying destination is raw IP'],
    riskScore: 72
  },
  {
    id: 'susp-003',
    url: 'https://x89f2a019bca40291e7841c.top/portal/index.html',
    category: 'suspicious',
    brand: 'High-Entropy DGA Domain',
    attackVector: 'Domain Generation Algorithm (DGA)',
    threatDescription: 'Domain constructed with pseudo-random hexadecimal string indicating algorithmic generation.',
    redFlags: ['High Shannon entropy (>4.5)', '.top TLD', 'Absence of brand or lexical tokens'],
    riskScore: 74
  },
  {
    id: 'susp-004',
    url: 'https://auth.secure.login.client.portal.gateway.verification.icu/session',
    category: 'suspicious',
    brand: 'Excessive Subdomain Layering',
    attackVector: 'Subdomain Camouflage Trick',
    threatDescription: 'Layers 7 subdomains to push the suspicious root domain off-screen on mobile browsers.',
    redFlags: ['7 subdomain layers', 'Mobile screen truncation exploit', '.icu TLD'],
    riskScore: 78
  },
  {
    id: 'susp-005',
    url: 'https://www.google.com//redirect?url=http://malicious-survey-rewards.xyz',
    category: 'suspicious',
    brand: 'Double Slash Open Redirect',
    attackVector: 'Open Redirect Exploit',
    threatDescription: 'Abuses a double slash path anomaly on a legitimate host to bounce traffic to external survey sites.',
    redFlags: ['Embedded double slash (//)', 'Unvalidated redirect parameter'],
    riskScore: 65
  },
  {
    id: 'susp-006',
    url: 'http://login.user:secretpass@untrusted-gateway.stream/auth',
    category: 'suspicious',
    brand: 'Credential Embedding URL (@)',
    attackVector: 'Host Obscuration Attack',
    threatDescription: 'Leverages the "@" character in URL syntax to mislead users regarding the actual destination host.',
    redFlags: ['"@" character embedded in URL', 'Misleading host display', '.stream TLD'],
    riskScore: 76
  },
  {
    id: 'susp-007',
    url: 'https://t.co/9faX201kLa?url=http://unknown-file-repository.cc/file.zip',
    category: 'suspicious',
    brand: 'Twitter Shortener Arbitrage',
    attackVector: 'Third-Party Whitelist Exploitation',
    threatDescription: 'Relies on t.co domain reputation to bypass email perimeter gateway filters.',
    redFlags: ['Bypasses reputation filtering', 'Terminal link points to .cc zip archive'],
    riskScore: 62
  },
  {
    id: 'susp-008',
    url: 'https://q918a-server-node-882.work/config/sync.json',
    category: 'suspicious',
    brand: 'Ephemeral Node Hosting',
    attackVector: 'Fast-Flux DNS Domain',
    threatDescription: 'Short-lived ephemeral domain hosted on fast-flux bulletproof hosting provider.',
    redFlags: ['Fast-flux infrastructure pattern', '.work TLD', 'High entropy name'],
    riskScore: 70
  },
  {
    id: 'susp-009',
    url: 'http://router-admin-setup.su:8080/cgi-bin/system.lua',
    category: 'suspicious',
    brand: 'IoT Router Management Probe',
    attackVector: 'CGI Script Exploitation',
    threatDescription: 'Probes home router default credentials over non-standard HTTP port.',
    redFlags: ['.su Soviet legacy TLD (frequently abused)', 'Direct CGI-bin path', 'Non-standard port'],
    riskScore: 79
  },
  {
    id: 'susp-010',
    url: 'https://cutt.ly/39kFA10?target=http://crypto-wheel-spinner.buzz',
    category: 'suspicious',
    brand: 'Cuttly Shortener Cloak',
    attackVector: 'Unfurl Obfuscation',
    threatDescription: 'Cloaks untrusted casino/crypto reward spinning wheel behind Cuttly redirection.',
    redFlags: ['Cuttly redirect', 'Gambling/crypto keyword combo', '.buzz TLD'],
    riskScore: 64
  },
  {
    id: 'susp-011',
    url: 'https://xn--appl-43d.com/support/iphone',
    category: 'suspicious',
    brand: 'Punycode Homograph Lookalike',
    attackVector: 'IDN Unicode Homoglyph Attack',
    threatDescription: 'Punycode domain (xn--appl-43d.com) resolving to look like "apple.com" with Cyrillic character.',
    redFlags: ['Punycode "xn--" prefix', 'Cyrillic character substitution', 'Lookalike visual deceive'],
    riskScore: 82
  },
  {
    id: 'susp-012',
    url: 'https://is.gd/8aK92F?ref=banking-alert',
    category: 'suspicious',
    brand: 'Is.gd Obfuscated Endpoint',
    attackVector: 'Shortener URL Smuggling',
    threatDescription: 'Unverified shortlink distributed via SMS without preview header.',
    redFlags: ['No preview shortlink', 'SMS distribution footprint'],
    riskScore: 61
  },
  {
    id: 'susp-013',
    url: 'https://94012830192830192830.space/data/payload',
    category: 'suspicious',
    brand: 'Numerical String Domain',
    attackVector: 'DGA / Disposable Node',
    threatDescription: '20-digit numerical domain name registered within last 48 hours.',
    redFlags: ['All-numeric domain name', 'Domain age < 48 hours', '.space TLD'],
    riskScore: 73
  },
  {
    id: 'susp-014',
    url: 'https://free-download-pdf-viewer.club/install/setup.html',
    category: 'suspicious',
    brand: 'Adware / Search Hijacker Portal',
    attackVector: 'Browser Hijacker & Extension Injection',
    threatDescription: 'Installs unwanted browser extension that modifies default search engine and injects popups.',
    redFlags: ['.club TLD', 'Bundles search redirect extensions', 'Aggressive popup triggers'],
    riskScore: 66
  },
  {
    id: 'susp-015',
    url: 'https://survey-rewards-cash-app-payout.cam/step1.php',
    category: 'suspicious',
    brand: 'Endless Survey Loop Trap',
    attackVector: 'PII Harvester / Affiliate Fraud',
    threatDescription: 'Locks users in endless loop of sponsored surveys while collecting PII (email, phone, address).',
    redFlags: ['.cam TLD', 'Affiliate survey farming', 'Excessive data collection forms'],
    riskScore: 69
  },
  {
    id: 'susp-016',
    url: 'https://buff.ly/2kP90xA?dest=http://unknown-server-endpoint.top',
    category: 'suspicious',
    brand: 'Buffly Obfuscated Shortener',
    attackVector: 'Reputation Evasion',
    threatDescription: 'Shortened link that masks final destination until HTTP handshake occurs.',
    redFlags: ['Buff.ly redirection', 'Target on .top TLD'],
    riskScore: 63
  },
  {
    id: 'susp-017',
    url: 'http://login.secure.system.operator.su/admin/console',
    category: 'suspicious',
    brand: 'Legacy Soviet TLD Hosting',
    attackVector: 'Bulletproof Unregulated TLD',
    threatDescription: 'Admin portal registered under the .su TLD, which lacks international registrar compliance.',
    redFlags: ['.su TLD', 'Absence of HTTPS/SSL', 'High bulletproof hosting incidence'],
    riskScore: 75
  },
  {
    id: 'susp-018',
    url: 'https://click-here-to-unlock-content.gq/gateway?id=992',
    category: 'suspicious',
    brand: 'Content Locker Trap',
    attackVector: 'Forced Extension Download',
    threatDescription: 'Requires users to install third-party software before unlocking claimed media content.',
    redFlags: ['.gq TLD', 'Content locking paywall deception', 'Unsigned software prompt'],
    riskScore: 71
  },
  {
    id: 'susp-019',
    url: 'https://rebrand.ly/9fa821?out=http://free-movie-stream-hd.xyz',
    category: 'suspicious',
    brand: 'Rebrandly Masked Gateway',
    attackVector: 'Adware Gateway Routing',
    threatDescription: 'Masks illicit streaming site loaded with malicious push notification prompts.',
    redFlags: ['Rebrandly masking', 'Malicious push notification lures', '.xyz TLD'],
    riskScore: 65
  },
  {
    id: 'susp-020',
    url: 'https://888-casino-vip-bonus-claim.stream/register.html',
    category: 'suspicious',
    brand: 'Unlicensed Online Casino',
    attackVector: 'Unregulated Financial Deposit',
    threatDescription: 'Collects crypto deposits for an unlicensed gambling platform with no withdrawal mechanism.',
    redFlags: ['.stream TLD', 'Unlicensed gambling operation', 'No regulatory disclosure'],
    riskScore: 70
  },
  {
    id: 'susp-021',
    url: 'https://update-driver-windows-system.loan/download.php',
    category: 'suspicious',
    brand: 'Suspicious Utility Portal',
    attackVector: 'Scareware / PUP Delivery',
    threatDescription: 'Runs fake browser scan showing "39 infected drivers" to sell fraudulent repair software.',
    redFlags: ['.loan TLD for tech utility', 'Scareware alert prompts', 'Fake system diagnostic'],
    riskScore: 76
  },
  {
    id: 'susp-022',
    url: 'https://s.id/1xY8a?redirect=http://91.240.118.42/test',
    category: 'suspicious',
    brand: 'S.id Indonesian Shortener Mask',
    attackVector: 'Direct IP Redirection Smuggling',
    threatDescription: 'Shortener masking raw IP target.',
    redFlags: ['Obfuscated shortlink', 'Resolves to raw IP'],
    riskScore: 69
  },
  {
    id: 'susp-023',
    url: 'https://fast-secure-vpn-proxy.science/connect.php',
    category: 'suspicious',
    brand: 'Rogue Free Proxy Node',
    attackVector: 'Traffic Sniffing / Man-In-The-Middle',
    threatDescription: 'Offers free proxy server that logs and inspects unencrypted user traffic.',
    redFlags: ['.science TLD', 'Unverified free proxy service', 'Traffic inspection risk'],
    riskScore: 72
  },
  {
    id: 'susp-024',
    url: 'https://account-security-center-2026.party/auth/verify',
    category: 'suspicious',
    brand: 'Mismatched Purpose TLD',
    attackVector: 'Phishing Precursor',
    threatDescription: 'Security verification branding deployed on a .party entertainment TLD.',
    redFlags: ['.party TLD for security domain', 'Generic security keywords', 'Recent registration'],
    riskScore: 77
  },
  {
    id: 'susp-025',
    url: 'https://tiny.cc/89fa01?url=http://suspicious-download-zone.buzz',
    category: 'suspicious',
    brand: 'Tiny.cc Cloaked Destination',
    attackVector: 'Double Hop Redirection',
    threatDescription: 'Double redirection hop designed to defeat sandboxing web crawler scanners.',
    redFlags: ['Double hop redirection', '.buzz landing domain'],
    riskScore: 67
  },

  // ================= FAKE OFFERS / E-COMMERCE (Green Tag) =================
  {
    id: 'offer-001',
    url: 'https://ray-ban-sunglasses-90-discount.xyz/shop/sunglasses',
    category: 'fake_offer',
    brand: 'Fake Ray-Ban 90% Discount Store',
    attackVector: 'Counterfeit Goods & Credit Card Theft',
    threatDescription: 'Promotes "90% off Ray-Ban holiday sale", harvesting card numbers and delivering counterfeit goods.',
    redFlags: ['Unrealistic 90% discount lure', '.xyz TLD for luxury goods', 'No verified merchant identity'],
    riskScore: 88
  },
  {
    id: 'offer-002',
    url: 'https://rolex-submariner-clearance-sale.top/watches/rolex',
    category: 'fake_offer',
    brand: 'Counterfeit Rolex Storefront',
    attackVector: 'High-Value Payment Fraud',
    threatDescription: 'Offers luxury Rolex timepieces for $199 instead of $12,000, stealing wire/credit card payments.',
    redFlags: ['Impossible luxury price cut', '.top TLD', 'Non-HTTPS payment gateway'],
    riskScore: 92
  },
  {
    id: 'offer-003',
    url: 'https://walmart-1000-giftcard-winner-claim.buzz/claim/card.php',
    category: 'fake_offer',
    brand: '$1,000 Walmart Gift Card Scam',
    attackVector: 'Subscription Trapping / Recurring Charges',
    threatDescription: 'Falsely claims user won a $1,000 Walmart gift card; charges $49.99 monthly subscription fee.',
    redFlags: ['Lottery winner social engineering', '.buzz TLD', 'Hidden recurring billing trap'],
    riskScore: 89
  },
  {
    id: 'offer-004',
    url: 'https://nike-air-jordan-retro-flash-sale.cam/shoes/jordans',
    category: 'fake_offer',
    brand: 'Fake Nike Jordan Flash Sale',
    attackVector: 'Counterfeit Footwear & PII Harvesting',
    threatDescription: 'Clones Nike storefront to sell fake Retro Jordans and capture consumer billing addresses.',
    redFlags: ['.cam TLD', 'Cloned Nike CSS stylesheets', 'No return policy or physical address'],
    riskScore: 86
  },
  {
    id: 'offer-005',
    url: 'https://amazon-pallets-unclaimed-liquidation.icu/store/pallet',
    category: 'fake_offer',
    brand: 'Amazon Unclaimed Pallet Scam',
    attackVector: 'Non-Delivery Ecommerce Fraud',
    threatDescription: 'Sells "unclaimed Amazon tech mystery boxes" for $49 containing high-end laptops that never ship.',
    redFlags: ['Mystery pallet social media lure', '.icu TLD', 'Fake consumer testimonials'],
    riskScore: 91
  },
  {
    id: 'offer-006',
    url: 'https://dyson-v15-vacuum-warehouse-clearance.work/dyson/sale',
    category: 'fake_offer',
    brand: 'Fake Dyson Vacuum Clearance',
    attackVector: 'Merchant Payment Interception',
    threatDescription: 'Advertises Dyson $750 vacuums for $69; payments are routed to unverified offshore merchant accounts.',
    redFlags: ['.work TLD for ecommerce', 'Extreme price anomaly (>90% off)', 'No official Dyson partnership'],
    riskScore: 87
  },
  {
    id: 'offer-007',
    url: 'https://shein-500-clothing-voucher-free.rest/voucher/get',
    category: 'fake_offer',
    brand: 'Shein $500 Voucher Bait',
    attackVector: 'Survey Farming / Identity Harvesting',
    threatDescription: 'Prompts teenagers on TikTok to enter full identity and phone numbers to receive non-existent Shein credit.',
    redFlags: ['.rest TLD', 'Viral TikTok survey lure', 'Harvests identity data for spam lists'],
    riskScore: 84
  },
  {
    id: 'offer-008',
    url: 'https://ps5-playstation5-bundle-giveaway.space/sony/claim.php',
    category: 'fake_offer',
    brand: 'PlayStation 5 Free Giveaway',
    attackVector: 'Advance Fee Fraud',
    threatDescription: 'Claims victim won a free PS5 bundle; demands $14.99 "shipping and insurance fee".',
    redFlags: ['Advance shipping fee lure', '.space TLD', 'No legitimate Sony sponsorship'],
    riskScore: 90
  },
  {
    id: 'offer-009',
    url: 'https://costco-wholesale-executive-membership-gift.monster/gift',
    category: 'fake_offer',
    brand: 'Fake Costco Member Reward',
    attackVector: 'Credit Card Verification Trick',
    threatDescription: 'Asks for credit card details to "verify identity" for a free 1-year Costco membership.',
    redFlags: ['.monster TLD', 'Asks for credit card for free gift', 'Counterfeit Costco logo'],
    riskScore: 88
  },
  {
    id: 'offer-010',
    url: 'https://lego-star-wars-millennium-falcon-clearance.top/sets',
    category: 'fake_offer',
    brand: 'Counterfeit LEGO Collector Store',
    attackVector: 'Collector E-Commerce Fraud',
    threatDescription: 'Offers $850 LEGO collector set for $45; delivers cheap knock-off plastic bricks or nothing.',
    redFlags: ['.top TLD', 'Unrealistic toy collector discount', 'Counterfeit LEGO trademark use'],
    riskScore: 85
  },
  {
    id: 'offer-011',
    url: 'https://apple-iphone16-pro-tester-program.buzz/survey/join',
    category: 'fake_offer',
    brand: 'Fake iPhone Tester Program',
    attackVector: 'Subscription Scams & PII Theft',
    threatDescription: 'Claims users can keep a free iPhone 16 Pro by writing a review after paying $2.95 trial fee.',
    redFlags: ['.buzz TLD', 'Pre-release product tester lure', 'Automated recurring card charges'],
    riskScore: 92
  },
  {
    id: 'offer-012',
    url: 'https://lululemon-leggings-overstock-sale.xyz/apparel/sale',
    category: 'fake_offer',
    brand: 'Lululemon Overstock Counterfeit',
    attackVector: 'Credit Card Theft / Counterfeit Apparel',
    threatDescription: 'Rogue e-commerce store impersonating Lululemon athletic apparel with fake reviews.',
    redFlags: ['.xyz TLD', 'Stolen catalog photography', 'No legitimate SSL company validation'],
    riskScore: 86
  },
  {
    id: 'offer-013',
    url: 'https://target-shopper-reward-card-500.live/target/redeem',
    category: 'fake_offer',
    brand: 'Target $500 Shopper Reward',
    attackVector: 'Identity Theft & Spam Enrollment',
    threatDescription: 'Claims 100 lucky shoppers won a $500 Target shopping spree; registers victims for 20+ telemarketing lists.',
    redFlags: ['.live TLD', 'Telemarketing lead generator', 'Bogus scarcity countdown timer'],
    riskScore: 83
  },
  {
    id: 'offer-014',
    url: 'https://temu-free-100-coupon-bundle.party/temu/wheel',
    category: 'fake_offer',
    brand: 'Fake Temu $100 Wheel Spinner',
    attackVector: 'Malicious App Side-Loading',
    threatDescription: 'Displays an animated spinning wheel always landing on $100, demanding users install unknown APK apps.',
    redFlags: ['.party TLD', 'Rigged wheel mechanic', 'Prompts dangerous APK side-loading'],
    riskScore: 89
  },
  {
    id: 'offer-015',
    url: 'https://stanley-cup-tumbler-limited-edition-sale.cam/cups/40oz',
    category: 'fake_offer',
    brand: 'Fake Stanley Tumbler Store',
    attackVector: 'Viral Trend Ecommerce Scam',
    threatDescription: 'Exploits viral Stanley 40oz tumbler trend, selling rare colors for $9.99 that never get dispatched.',
    redFlags: ['.cam TLD', 'Exploits viral social trend', 'Disposible checkout domain'],
    riskScore: 87
  },
  {
    id: 'offer-016',
    url: 'https://louis-vuitton-handbags-outlet-clearance.work/bags',
    category: 'fake_offer',
    brand: 'Fake Louis Vuitton Outlet',
    attackVector: 'Luxury Counterfeit & Card Fraud',
    threatDescription: 'Claims to be an authorized Louis Vuitton outlet offering $3,000 bags for $120.',
    redFlags: ['.work TLD for luxury fashion', 'Luxury brand does not operate outlet sites', 'Card theft form'],
    riskScore: 90
  },
  {
    id: 'offer-017',
    url: 'https://gucci-luxury-belts-shoes-sale.icu/gucci/deals',
    category: 'fake_offer',
    brand: 'Fake Gucci Clearance Portal',
    attackVector: 'Unauthorized Payment Gateway',
    threatDescription: 'Counterfeits Gucci shopping cart to skim credit cards and direct payments to offshore mules.',
    redFlags: ['.icu TLD', 'Skimmer script in checkout form', 'Unsecured merchant processor'],
    riskScore: 89
  },
  {
    id: 'offer-018',
    url: 'https://starbucks-free-coffee-for-a-year.rest/starbucks/voucher',
    category: 'fake_offer',
    brand: 'Starbucks Free Coffee For A Year',
    attackVector: 'SMS Smishing & Premium Rate Subscription',
    threatDescription: 'Subscribes victim to a $9.99/week premium SMS horoscopes service disguised as a Starbucks promotion.',
    redFlags: ['.rest TLD', 'Hidden premium SMS billing clause', 'Viral WhatsApp forward bait'],
    riskScore: 85
  },
  {
    id: 'offer-019',
    url: 'https://mcdonalds-free-bigmac-voucher-coupon.buzz/claim/coupon',
    category: 'fake_offer',
    brand: 'McDonalds Free Meal Coupon Lure',
    attackVector: 'Browser Push Notification Spam',
    threatDescription: 'Requires users to "Allow Notifications" to claim coupon, flooding Windows/Mac desktop with spam ads.',
    redFlags: ['.buzz TLD', 'Abuses browser WebPush notifications', 'Adware distribution network'],
    riskScore: 82
  },
  {
    id: 'offer-020',
    url: 'https://uber-eats-free-50-food-voucher.space/ubereats/gift',
    category: 'fake_offer',
    brand: 'UberEats $50 Food Promo Trap',
    attackVector: 'Account Credential Theft',
    threatDescription: 'Demands users log in with their Uber credentials to deposit a fake $50 promo voucher.',
    redFlags: ['.space TLD', 'Harvests Uber logins and linked payment cards'],
    riskScore: 91
  },
  {
    id: 'offer-021',
    url: 'https://adidas-yeezy-boost-clearance-warehouse.click/shoes',
    category: 'fake_offer',
    brand: 'Fake Adidas Yeezy Liquidation',
    attackVector: 'Counterfeit Streetwear Fraud',
    threatDescription: 'Offers rare Yeezy sneakers with fabricated inventory counters to induce FOMO purchases.',
    redFlags: ['.click TLD', 'Artificial FOMO inventory countdowns', 'Non-delivery merchant track record'],
    riskScore: 86
  },
  {
    id: 'offer-022',
    url: 'https://booking-hotel-luxury-discounts-80.monster/hotels/deal',
    category: 'fake_offer',
    brand: 'Fake Booking.com 80% Hotel Deals',
    attackVector: 'Vacation Booking Payment Theft',
    threatDescription: 'Collects advance non-refundable hotel reservation deposits for non-existent luxury suites.',
    redFlags: ['.monster TLD', 'Counterfeits Booking.com UI', 'Non-refundable wire transfer demand'],
    riskScore: 93
  },
  {
    id: 'offer-023',
    url: 'https://airbnb-luxury-villa-exclusive-deal.top/villas/booking',
    category: 'fake_offer',
    brand: 'Fake Airbnb Villa Rental',
    attackVector: 'Escrow Payment Fraud',
    threatDescription: 'Lists stolen property photos and asks victims to pay via direct crypto or Zelle instead of Airbnb.',
    redFlags: ['.top TLD', 'Requests off-platform payment (Zelle/Crypto)', 'Stolen real estate images'],
    riskScore: 94
  },
  {
    id: 'offer-024',
    url: 'https://crocs-classic-clogs-buy-1-get-3-free.xyz/shoes/clogs',
    category: 'fake_offer',
    brand: 'Fake Crocs "Buy 1 Get 3 Free"',
    attackVector: 'Bulk Counterfeit E-Commerce',
    threatDescription: 'Offers absurd "Buy 1 Get 3 Free" promotion to capture credit cards on social media ads.',
    redFlags: ['.xyz TLD', 'Absurd promotional multiplier', 'No customer service contact'],
    riskScore: 84
  },
  {
    id: 'offer-025',
    url: 'https://north-face-winter-jacket-clearance.buzz/jackets/deals',
    category: 'fake_offer',
    brand: 'The North Face Winter Clearance',
    attackVector: 'Seasonal Counterfeit Scams',
    threatDescription: 'Capitalizes on winter season demand to sell counterfeit jackets, capturing full card details.',
    redFlags: ['.buzz TLD', 'Seasonal phishing lure', 'Harvests full CVV and billing info'],
    riskScore: 88
  }
];
