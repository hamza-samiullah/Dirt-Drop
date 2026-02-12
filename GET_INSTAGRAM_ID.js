// ============================================================================
// GET INSTAGRAM BUSINESS ACCOUNT ID - ALL METHODS
// ============================================================================
// Copy and paste these scripts into your browser console
// Update the token with your latest access token from Graph API Explorer
// ============================================================================

// ----------------------------------------------------------------------------
// METHOD 1: Get from all Facebook Pages
// ----------------------------------------------------------------------------
console.log('METHOD 1: Checking all Facebook Pages...\n');

const token1 = 'PASTE_YOUR_ACCESS_TOKEN_HERE';

fetch(`https://graph.facebook.com/v18.0/me/accounts?fields=id,name,instagram_business_account&access_token=${token1}`)
  .then(res => res.json())
  .then(data => {
    console.log('Full Response:', JSON.stringify(data, null, 2));
    
    if (data.data && data.data.length > 0) {
      data.data.forEach((page, index) => {
        console.log(`\nPage ${index + 1}:`);
        console.log('  Name:', page.name);
        console.log('  Page ID:', page.id);
        
        if (page.instagram_business_account) {
          console.log('  ✅ Instagram Business ID:', page.instagram_business_account.id);
          console.log('\n  Add to .env.local:');
          console.log(`  INSTAGRAM_BUSINESS_ACCOUNT_ID=${page.instagram_business_account.id}`);
        } else {
          console.log('  ❌ No Instagram connected');
        }
      });
    }
  });

// ----------------------------------------------------------------------------
// METHOD 2: Get from specific Facebook Page
// ----------------------------------------------------------------------------
console.log('\n\nMETHOD 2: Checking specific Facebook Page...\n');

const token2 = 'PASTE_YOUR_ACCESS_TOKEN_HERE';
const pageId = '953961091123759'; // Your Dirt Drop page ID

fetch(`https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${token2}`)
  .then(res => res.json())
  .then(data => {
    console.log('Response:', data);
    
    if (data.instagram_business_account) {
      console.log('\n✅ Instagram Business Account ID:', data.instagram_business_account.id);
      console.log('\nAdd to .env.local:');
      console.log(`INSTAGRAM_BUSINESS_ACCOUNT_ID=${data.instagram_business_account.id}`);
      console.log(`INSTAGRAM_ACCESS_TOKEN=${token2}`);
    } else {
      console.log('\n❌ Instagram not connected to this page');
      console.log('Go to Facebook Page Settings → Instagram → Connect Account');
    }
  });

// ----------------------------------------------------------------------------
// METHOD 3: Get Instagram account info directly
// ----------------------------------------------------------------------------
console.log('\n\nMETHOD 3: Getting Instagram account info...\n');

const token3 = 'PASTE_YOUR_ACCESS_TOKEN_HERE';

fetch(`https://graph.facebook.com/v18.0/me?fields=id,username&access_token=${token3}`)
  .then(res => res.json())
  .then(data => {
    console.log('Instagram User Info:', data);
    
    if (data.id) {
      console.log('\n✅ Instagram User ID:', data.id);
      console.log('Username:', data.username);
      console.log('\nTry using this as Business Account ID:');
      console.log(`INSTAGRAM_BUSINESS_ACCOUNT_ID=${data.id}`);
    }
  });

// ============================================================================
// INSTRUCTIONS
// ============================================================================
/*

STEP 1: Get Access Token
-------------------------
1. Go to: https://developers.facebook.com/tools/explorer/
2. Select your app (ID: 898802415967891)
3. Click "Generate Access Token"
4. Select permissions:
   - pages_show_list
   - pages_read_engagement
5. Copy the token

STEP 2: Run Scripts
-------------------
1. Replace 'PASTE_YOUR_ACCESS_TOKEN_HERE' with your token in each method
2. Copy and paste each method into browser console
3. Look for the Instagram Business Account ID in the output

STEP 3: Update .env.local
-------------------------
Add the ID you found:

INSTAGRAM_BUSINESS_ACCOUNT_ID=your_id_here
INSTAGRAM_ACCESS_TOKEN=your_token_here

STEP 4: Restart Server
----------------------
npm run dev

STEP 5: Test
------------
1. Go to Content Manager
2. Upload an image
3. Wait for AI suggestions
4. Click "Approve & Post"
5. Check Instagram!

*/

// ============================================================================
// TROUBLESHOOTING
// ============================================================================
/*

If Instagram Business Account ID is not found:
----------------------------------------------
1. Make sure your Instagram account is a Business Account
2. Go to Facebook Page Settings
3. Click "Instagram" in left menu
4. Click "Connect Account"
5. Log in to your Instagram Business Account
6. Run the scripts again

If you get permission errors:
-----------------------------
1. Regenerate access token with correct permissions
2. Make sure you selected:
   - pages_show_list
   - pages_read_engagement

If nothing works:
-----------------
Contact Facebook support or check:
https://developers.facebook.com/docs/instagram-api/getting-started

*/
