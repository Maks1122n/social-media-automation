# Rollback Plan - Emergency Procedures

## Database Migration Rollback

### If migration fails during deployment:

1. **Check migration status:**
   ```bash
   npx prisma migrate status
   ```

2. **If migration is pending/failed:**
   ```bash
   npx prisma migrate resolve --rolled-back <migration_name>
   ```

3. **Revert to previous migration:**
   ```bash
   npx prisma migrate reset --force
   npx prisma migrate deploy
   ```

4. **For production, use shadow database:**
   ```bash
   npx prisma migrate diff \
     --from-schema-datamodel prisma/schema.prisma \
     --to-schema-datasource $DATABASE_URL \
     --script
   ```

## Application Rollback

### If backend deployment fails:

1. **Render Console → Deployments → Previous Version → Redeploy**

2. **If code issues, revert commit:**
   ```bash
   git revert <commit_hash>
   git push origin main
   ```

3. **Emergency hotfix process:**
   ```bash
   git checkout -b hotfix/emergency-fix
   # Make minimal fix
   git commit -m "🚨 HOTFIX: Emergency fix"
   git push origin hotfix/emergency-fix
   # Create PR and merge immediately
   ```

## Database Recovery

### If data corruption occurs:

1. **Check database backups in Render Console**
2. **Restore from latest backup**
3. **Re-run migrations if needed**
4. **Verify data integrity with seed script**

## Monitoring Alerts

### Setup alerts for:
- HTTP 5xx errors > 5% for 5 minutes
- Database connection failures
- JWT token validation errors
- Rate limit threshold breaches
- Memory usage > 90%
- Response time > 2 seconds

### Emergency contacts:
- Primary: [Your contact]
- Secondary: [Backup contact]
- Render Support: support@render.com 