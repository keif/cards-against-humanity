"""
Tilt dev environment for Cards Against Humanity
Run `tilt up` to start the frontend, backend, and an optional Redis container.
"""

# --- Infrastructure --------------------------------------------------------

local_resource(
	name='redis',
	serve_cmd='docker run --rm --name cah-redis -p 6379:6379 redis:7-alpine',
	allow_parallel=True,
	labels=['infra'],
)

# --- Frontend --------------------------------------------------------------

local_resource(
	name='frontend',
	serve_cmd='pnpm dev:client',
	allow_parallel=True,
	labels=['frontend'],
	deps=[
		'client/package.json',
		'client/src',
		'client/vite.config.ts',
		'client/tailwind.config.js',
		'pnpm-lock.yaml',
	],
)

# --- Backend ---------------------------------------------------------------

local_resource(
	name='backend',
	serve_cmd='pnpm dev:server',
	allow_parallel=True,
	labels=['backend'],
	deps=[
		'server/package.json',
		'server/src',
		'server/tsconfig.json',
		'pnpm-lock.yaml',
	],
	resource_deps=['redis'],
)

# --- Lint ------------------------------------------------------------------

local_resource(
	name='lint',
	cmd='pnpm lint',
	deps=[
		'client/src',
		'client/.eslintrc.cjs',
		'server/src',
		'server/.eslintrc.cjs',
		'package.json',
		'client/package.json',
		'server/package.json',
	],
	trigger_mode=TRIGGER_MODE_MANUAL,
	labels=['lint'],
)

# --- Tests -----------------------------------------------------------------

local_resource(
	name='tests',
	cmd='pnpm test',
	deps=[
		'client/src',
		'server/src',
	],
	trigger_mode=TRIGGER_MODE_MANUAL,
	labels=['tests'],
)
