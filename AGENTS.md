# Nuxt filesystem module

This repository owns the Nuxt integration for `@owdproject/module-fs`. Read the [Nuxt extension contract](https://github.com/owdproject/nuxt/blob/main/docs/extension-contract.md) before changing integration behavior; keep the framework-independent engine in its own repository.

Preserve user changes. Never depend on the deprecated unscoped `nuxt-desktop`. Verify integrations in a standalone playground with locally packed dependencies and Verdaccio snapshots, without public npm publication.
