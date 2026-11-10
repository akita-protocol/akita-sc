# Migration from @txnlab/deflex

## Package Rename

```bash
npm uninstall @txnlab/deflex
npm install @txnlab/haystack-router
```

## Import Changes

```typescript
// Before
import { DeflexClient } from '@txnlab/deflex'

// After
import { RouterClient } from '@txnlab/haystack-router'
```

## Class and Type Renames

| Before (@txnlab/deflex) | After (@txnlab/haystack-router) |
| ----------------------- | ------------------------------- |
| `DeflexClient`          | `RouterClient`                  |
| `DeflexQuote`           | `SwapQuote`                     |
| `DeflexTransaction`     | `SwapTransaction`               |
| `DeflexConfig`          | `Config`                        |
| `DeflexConfigParams`    | `ConfigParams`                  |
| `DeflexSignature`       | `Signature`                     |

## API Endpoint

The SDK automatically uses the updated API endpoint. No manual URL changes needed.

## Functionality

All functionality is identical — only naming changed. A find-and-replace of the class and type names is sufficient.

### Quick Migration

```bash
# Find all files that import from @txnlab/deflex
grep -r "@txnlab/deflex" --include="*.ts" --include="*.tsx" -l

# Replace imports
# @txnlab/deflex → @txnlab/haystack-router
# DeflexClient → RouterClient
# DeflexQuote → SwapQuote
# DeflexTransaction → SwapTransaction
# DeflexConfig → Config
# DeflexConfigParams → ConfigParams
# DeflexSignature → Signature
```
