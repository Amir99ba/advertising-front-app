# Admin authentication

Passwords are stored only as bcrypt hashes. Never put a plain-text password in the `Admin.password` column.

## Create or update an admin

```powershell
npm run auth:create-admin -- 09123456789 "Your-Strong-Password-Here"
```

This command hashes the password with bcrypt cost 12 and upserts the mobile number safely.

If you must edit the database manually, first generate a hash:

```powershell
npm run auth:hash -- "Your-Strong-Password-Here"
```

Store the output in `Admin.password` and store the normalized Iranian mobile number (for example `09123456789`) in `Admin.phone`.

Set `JWT_SECRET` to a unique random value of at least 32 characters in every deployed environment. Changing it signs every admin out.

After five failed attempts, the account is locked for 15 minutes. Sessions use an HttpOnly, SameSite=Strict, signed cookie and expire after eight hours.
