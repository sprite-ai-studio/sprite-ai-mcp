# Sprite AI MCP server

Generate, animate, rotate and restyle pixel art game sprites from Claude Code, Cursor, Codex or any MCP client.

[Website](https://www.sprite-ai.art/mcp) · [Docs](https://www.sprite-ai.art/docs/mcp) · [Get an API key](https://www.sprite-ai.art/account?tab=api-keys) · [Pricing](https://www.sprite-ai.art/pricing) · [Discord](https://discord.gg/fpQ7fdVGSN)

Sprite AI is a hosted MCP server. There is nothing to install or run. Point your client at the endpoint and pass your API key.

| | |
|---|---|
| Endpoint | `https://www.sprite-ai.art/api/mcp` |
| Transport | Streamable HTTP |
| Auth | `Authorization: Bearer sai_sk_...` |
| Tools | 16 |

## What your agent can do

- **Generate sprites from a prompt.** Characters, creatures, props, weapons, vehicles, tiles, backgrounds, UI and effects, from 32 to 400 pixels.
- **Animate a sprite into a sprite sheet.** Walk, run, idle, attack and more, up to 16 frames.
- **Rotate a sprite to 8 directions** for top-down and isometric games.
- **Restyle a sprite** into gold, ice, zombie or any style you describe, and keep the same character.
- **Combine two sprites**, like a knight holding a shield from another sprite.
- **Make normal maps** for dynamic lighting in your engine.
- **Remove a flat background** and get a transparent PNG.
- **Generate and save color palettes**, then draw new sprites in them.

Sprites come back inline as PNG, so the agent can see them and save them straight into your game project.

## Get an API key

1. Sign up at [sprite-ai.art](https://www.sprite-ai.art). New accounts get 15 free tokens.
2. Make a key in [Account > API keys](https://www.sprite-ai.art/account?tab=api-keys). It starts with `sai_sk_`.

Replace `sai_sk_your_key_here` in the examples below with your key.

## Install

### Claude Code

```bash
claude mcp add --transport http sprite-ai \
  https://www.sprite-ai.art/api/mcp \
  --header "Authorization: Bearer sai_sk_your_key_here"
```

### Codex

```bash
export SPRITE_AI_API_KEY="sai_sk_your_key_here"
codex mcp add sprite-ai \
  --url https://www.sprite-ai.art/api/mcp \
  --bearer-token-env-var SPRITE_AI_API_KEY
```

### Cursor

Add this to `.cursor/mcp.json`. The [MCP page](https://www.sprite-ai.art/mcp) also has a one-click install button.

```json
{
  "mcpServers": {
    "sprite-ai": {
      "url": "https://www.sprite-ai.art/api/mcp",
      "headers": { "Authorization": "Bearer sai_sk_your_key_here" }
    }
  }
}
```

### VS Code

Add this to `.vscode/mcp.json`. VS Code asks for the key the first time the server starts.

```json
{
  "servers": {
    "sprite-ai": {
      "type": "http",
      "url": "https://www.sprite-ai.art/api/mcp",
      "headers": { "Authorization": "Bearer ${input:sprite-ai-key}" }
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "sprite-ai-key",
      "description": "Sprite AI API key (starts with sai_sk_)",
      "password": true
    }
  ]
}
```

### Other clients

Windsurf, Cline and most other clients accept the Cursor block above. A client that only runs local stdio servers can reach it through [mcp-remote](https://www.npmjs.com/package/mcp-remote).

```json
{
  "mcpServers": {
    "sprite-ai": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://www.sprite-ai.art/api/mcp",
        "--header",
        "Authorization:${SPRITE_AI_AUTH}"
      ],
      "env": { "SPRITE_AI_AUTH": "Bearer sai_sk_your_key_here" }
    }
  }
}
```

Gateways that keep the `Authorization` header for themselves can send the key as `x-api-key: sai_sk_...` instead.

## Tools

| Tool | What it does | Tokens |
|---|---|---|
| `sprite_generate` | Generate a still sprite from a prompt | 1 |
| `sprite_generate_animation` | Animate a sprite into a sprite sheet | 14 to 20 |
| `sprite_rotate` | Turn a sprite into 8 directions | 12 |
| `sprite_restyle` | Redraw a sprite in a new style, same character | 2, or 9 on pro |
| `sprite_combine` | Put an item from one sprite into another | 3, or 9 on pro |
| `sprite_normal_map` | Make a normal map for dynamic lighting | 1 per frame |
| `sprite_remove_background` | Remove a flat background | Free, or 1 for refined |
| `sprite_import` | Add a PNG you already have, to animate or restyle it | Free |
| `sprite_get_job` | Check an animation, restyle or combine job | Free |
| `sprite_list_creations` | List your past sprites and animations | Free |
| `sprite_get_balance` | Check your token balance | Free |
| `sprite_list_asset_types` | List asset types, sizes and costs | Free |
| `sprite_capabilities` | Read the full capability reference | Free |
| `sprite_generate_palette` | Propose color palettes from a description | Free |
| `sprite_save_palette` | Save a palette to your library | Free |
| `sprite_list_palettes` | List your saved palettes | Free |

Full schemas are in the [server card](https://www.sprite-ai.art/.well-known/mcp/server-card.json).

## Try these prompts

- "Make a 64x64 knight with a blue cape, animate a walk cycle and save the sheet to assets/sprites."
- "Generate a mossy dungeon palette with 16 colors, then make five floor tiles with it."
- "Rotate my player sprite to 8 directions for a top-down game."
- "Turn this slime into gold, ice and zombie versions."

## Pricing

Everything runs on tokens. A sprite costs 1 token, and failed generations cost nothing. New accounts get 15 free tokens, no card needed. Plans start at $8 a month. See [pricing](https://www.sprite-ai.art/pricing).

## About this repo

The server is hosted by Sprite AI. This repo holds its public listing files.

- `server.json` is the entry in the [official MCP Registry](https://registry.modelcontextprotocol.io) as `art.sprite-ai/sprite-ai`.
- `lhm.plugin.json` is the [LobeHub](https://lobehub.com/mcp) listing.
- `sync-tools.mjs` copies the tool list from the live server card into `lhm.plugin.json` (Node 22+).

Questions and bug reports go to [Discord](https://discord.gg/fpQ7fdVGSN) or [GitHub issues](https://github.com/sprite-ai-art/sprite-ai-mcp/issues).

## License

The files in this repo are MIT licensed. See [LICENSE](LICENSE).
