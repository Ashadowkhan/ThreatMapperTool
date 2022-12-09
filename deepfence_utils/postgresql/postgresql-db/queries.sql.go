// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: queries.sql

package postgresql_db

import (
	"context"
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

const countCompanies = `-- name: CountCompanies :one
SELECT count(*)
FROM company
`

func (q *Queries) CountCompanies(ctx context.Context) (int64, error) {
	row := q.db.QueryRowContext(ctx, countCompanies)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const countUsers = `-- name: CountUsers :one
SELECT count(*)
FROM users
`

func (q *Queries) CountUsers(ctx context.Context) (int64, error) {
	row := q.db.QueryRowContext(ctx, countUsers)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const createApiToken = `-- name: CreateApiToken :one
INSERT INTO api_token (api_token, name, company_id, role_id, group_id, created_by_user_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, api_token, name, company_id, group_id, role_id, created_by_user_id, created_at, updated_at
`

type CreateApiTokenParams struct {
	ApiToken        uuid.UUID
	Name            string
	CompanyID       int32
	RoleID          int32
	GroupID         int32
	CreatedByUserID int64
}

func (q *Queries) CreateApiToken(ctx context.Context, arg CreateApiTokenParams) (ApiToken, error) {
	row := q.db.QueryRowContext(ctx, createApiToken,
		arg.ApiToken,
		arg.Name,
		arg.CompanyID,
		arg.RoleID,
		arg.GroupID,
		arg.CreatedByUserID,
	)
	var i ApiToken
	err := row.Scan(
		&i.ID,
		&i.ApiToken,
		&i.Name,
		&i.CompanyID,
		&i.GroupID,
		&i.RoleID,
		&i.CreatedByUserID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createCompany = `-- name: CreateCompany :one
INSERT INTO company (name, email_domain, namespace)
VALUES ($1, $2, $3)
RETURNING id, name, email_domain, created_at, updated_at, namespace
`

type CreateCompanyParams struct {
	Name        string
	EmailDomain string
	Namespace   string
}

func (q *Queries) CreateCompany(ctx context.Context, arg CreateCompanyParams) (Company, error) {
	row := q.db.QueryRowContext(ctx, createCompany, arg.Name, arg.EmailDomain, arg.Namespace)
	var i Company
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.EmailDomain,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Namespace,
	)
	return i, err
}

const createRole = `-- name: CreateRole :one
INSERT INTO role (name)
VALUES ($1)
RETURNING id, name, created_at, updated_at
`

func (q *Queries) CreateRole(ctx context.Context, name string) (Role, error) {
	row := q.db.QueryRowContext(ctx, createRole, name)
	var i Role
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createSetting = `-- name: CreateSetting :one
INSERT INTO setting (key, value, is_visible_on_ui)
VALUES ($1, $2, $3)
RETURNING id, key, value, is_visible_on_ui, created_at, updated_at
`

type CreateSettingParams struct {
	Key           string
	Value         json.RawMessage
	IsVisibleOnUi bool
}

func (q *Queries) CreateSetting(ctx context.Context, arg CreateSettingParams) (Setting, error) {
	row := q.db.QueryRowContext(ctx, createSetting, arg.Key, arg.Value, arg.IsVisibleOnUi)
	var i Setting
	err := row.Scan(
		&i.ID,
		&i.Key,
		&i.Value,
		&i.IsVisibleOnUi,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createUser = `-- name: CreateUser :one
INSERT INTO users (first_name, last_name, email, role_id, group_ids, company_id, password_hash, is_active,
                   password_invalidated)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING id, first_name, last_name, email, role_id, group_ids, company_id, password_hash, is_active, password_invalidated, created_at, updated_at
`

type CreateUserParams struct {
	FirstName           string
	LastName            string
	Email               string
	RoleID              int32
	GroupIds            json.RawMessage
	CompanyID           int32
	PasswordHash        string
	IsActive            bool
	PasswordInvalidated bool
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.FirstName,
		arg.LastName,
		arg.Email,
		arg.RoleID,
		arg.GroupIds,
		arg.CompanyID,
		arg.PasswordHash,
		arg.IsActive,
		arg.PasswordInvalidated,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Email,
		&i.RoleID,
		&i.GroupIds,
		&i.CompanyID,
		&i.PasswordHash,
		&i.IsActive,
		&i.PasswordInvalidated,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const createUserGroup = `-- name: CreateUserGroup :one
INSERT INTO user_group (name, company_id, is_system)
VALUES ($1, $2, $3)
RETURNING id, name, is_system, company_id, created_at, updated_at
`

type CreateUserGroupParams struct {
	Name      string
	CompanyID int32
	IsSystem  bool
}

func (q *Queries) CreateUserGroup(ctx context.Context, arg CreateUserGroupParams) (UserGroup, error) {
	row := q.db.QueryRowContext(ctx, createUserGroup, arg.Name, arg.CompanyID, arg.IsSystem)
	var i UserGroup
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.IsSystem,
		&i.CompanyID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteApiToken = `-- name: DeleteApiToken :exec
DELETE
FROM api_token
WHERE id = $1
`

func (q *Queries) DeleteApiToken(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteApiToken, id)
	return err
}

const deleteCompany = `-- name: DeleteCompany :exec
DELETE
FROM company
WHERE id = $1
`

func (q *Queries) DeleteCompany(ctx context.Context, id int32) error {
	_, err := q.db.ExecContext(ctx, deleteCompany, id)
	return err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE
FROM users
WHERE id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteUser, id)
	return err
}

const getActiveUsers = `-- name: GetActiveUsers :many
SELECT id, first_name, last_name, email, role_id, group_ids, company_id, password_hash, is_active, password_invalidated, created_at, updated_at
FROM users
WHERE company_id = $1
  AND is_active = 't'
ORDER BY first_name
`

func (q *Queries) GetActiveUsers(ctx context.Context, companyID int32) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, getActiveUsers, companyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.FirstName,
			&i.LastName,
			&i.Email,
			&i.RoleID,
			&i.GroupIds,
			&i.CompanyID,
			&i.PasswordHash,
			&i.IsActive,
			&i.PasswordInvalidated,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getApiToken = `-- name: GetApiToken :one
SELECT id, api_token, name, company_id, group_id, role_id, created_by_user_id, created_at, updated_at
FROM api_token
WHERE id = $1
LIMIT 1
`

func (q *Queries) GetApiToken(ctx context.Context, id int64) (ApiToken, error) {
	row := q.db.QueryRowContext(ctx, getApiToken, id)
	var i ApiToken
	err := row.Scan(
		&i.ID,
		&i.ApiToken,
		&i.Name,
		&i.CompanyID,
		&i.GroupID,
		&i.RoleID,
		&i.CreatedByUserID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getApiTokenByToken = `-- name: GetApiTokenByToken :one
SELECT api_token.api_token,
       api_token.name,
       api_token.company_id,
       api_token.role_id,
       api_token.group_id,
       api_token.created_by_user_id,
       users.first_name           as first_name,
       users.last_name            as last_name,
       users.email                as email,
       role.name                  as role_name,
       company.name               as company_name,
       company.namespace          as company_namespace,
       users.is_active            as is_user_active,
       users.password_invalidated as user_password_invalidated,
       api_token.created_at,
       api_token.updated_at
FROM api_token
         INNER JOIN users ON users.id = api_token.created_by_user_id
         INNER JOIN role ON role.id = api_token.role_id
         INNER JOIN company ON company.id = api_token.company_id
WHERE api_token = $1
LIMIT 1
`

type GetApiTokenByTokenRow struct {
	ApiToken                uuid.UUID
	Name                    string
	CompanyID               int32
	RoleID                  int32
	GroupID                 int32
	CreatedByUserID         int64
	FirstName               string
	LastName                string
	Email                   string
	RoleName                string
	CompanyName             string
	CompanyNamespace        string
	IsUserActive            bool
	UserPasswordInvalidated bool
	CreatedAt               time.Time
	UpdatedAt               time.Time
}

func (q *Queries) GetApiTokenByToken(ctx context.Context, apiToken uuid.UUID) (GetApiTokenByTokenRow, error) {
	row := q.db.QueryRowContext(ctx, getApiTokenByToken, apiToken)
	var i GetApiTokenByTokenRow
	err := row.Scan(
		&i.ApiToken,
		&i.Name,
		&i.CompanyID,
		&i.RoleID,
		&i.GroupID,
		&i.CreatedByUserID,
		&i.FirstName,
		&i.LastName,
		&i.Email,
		&i.RoleName,
		&i.CompanyName,
		&i.CompanyNamespace,
		&i.IsUserActive,
		&i.UserPasswordInvalidated,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getApiTokens = `-- name: GetApiTokens :many
SELECT id, api_token, name, company_id, group_id, role_id, created_by_user_id, created_at, updated_at
FROM api_token
WHERE company_id = $1
ORDER BY name
`

func (q *Queries) GetApiTokens(ctx context.Context, companyID int32) ([]ApiToken, error) {
	rows, err := q.db.QueryContext(ctx, getApiTokens, companyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ApiToken
	for rows.Next() {
		var i ApiToken
		if err := rows.Scan(
			&i.ID,
			&i.ApiToken,
			&i.Name,
			&i.CompanyID,
			&i.GroupID,
			&i.RoleID,
			&i.CreatedByUserID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getApiTokensByUser = `-- name: GetApiTokensByUser :many
SELECT id, api_token, name, company_id, group_id, role_id, created_by_user_id, created_at, updated_at
FROM api_token
WHERE created_by_user_id = $1
`

func (q *Queries) GetApiTokensByUser(ctx context.Context, createdByUserID int64) ([]ApiToken, error) {
	rows, err := q.db.QueryContext(ctx, getApiTokensByUser, createdByUserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ApiToken
	for rows.Next() {
		var i ApiToken
		if err := rows.Scan(
			&i.ID,
			&i.ApiToken,
			&i.Name,
			&i.CompanyID,
			&i.GroupID,
			&i.RoleID,
			&i.CreatedByUserID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getCompanies = `-- name: GetCompanies :many
SELECT id, name, email_domain, created_at, updated_at, namespace
FROM company
ORDER BY name
`

func (q *Queries) GetCompanies(ctx context.Context) ([]Company, error) {
	rows, err := q.db.QueryContext(ctx, getCompanies)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Company
	for rows.Next() {
		var i Company
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.EmailDomain,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Namespace,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getCompany = `-- name: GetCompany :one
SELECT id, name, email_domain, created_at, updated_at, namespace
FROM company
WHERE id = $1
LIMIT 1
`

func (q *Queries) GetCompany(ctx context.Context, id int32) (Company, error) {
	row := q.db.QueryRowContext(ctx, getCompany, id)
	var i Company
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.EmailDomain,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Namespace,
	)
	return i, err
}

const getCompanyByDomain = `-- name: GetCompanyByDomain :one
SELECT id, name, email_domain, created_at, updated_at, namespace
FROM company
WHERE email_domain = $1
LIMIT 1
`

func (q *Queries) GetCompanyByDomain(ctx context.Context, emailDomain string) (Company, error) {
	row := q.db.QueryRowContext(ctx, getCompanyByDomain, emailDomain)
	var i Company
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.EmailDomain,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Namespace,
	)
	return i, err
}

const getPasswordHash = `-- name: GetPasswordHash :one
SELECT password_hash
FROM users
WHERE id = $1
LIMIT 1
`

func (q *Queries) GetPasswordHash(ctx context.Context, id int64) (string, error) {
	row := q.db.QueryRowContext(ctx, getPasswordHash, id)
	var password_hash string
	err := row.Scan(&password_hash)
	return password_hash, err
}

const getRoleByID = `-- name: GetRoleByID :one
SELECT id, name, created_at, updated_at
FROM role
WHERE id = $1
LIMIT 1
`

func (q *Queries) GetRoleByID(ctx context.Context, id int32) (Role, error) {
	row := q.db.QueryRowContext(ctx, getRoleByID, id)
	var i Role
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getRoleByName = `-- name: GetRoleByName :one
SELECT id, name, created_at, updated_at
FROM role
WHERE name = $1
LIMIT 1
`

func (q *Queries) GetRoleByName(ctx context.Context, name string) (Role, error) {
	row := q.db.QueryRowContext(ctx, getRoleByName, name)
	var i Role
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getRoles = `-- name: GetRoles :many
SELECT id, name, created_at, updated_at
FROM role
ORDER BY name
`

func (q *Queries) GetRoles(ctx context.Context) ([]Role, error) {
	rows, err := q.db.QueryContext(ctx, getRoles)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Role
	for rows.Next() {
		var i Role
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getSetting = `-- name: GetSetting :one
SELECT id, key, value, is_visible_on_ui, created_at, updated_at
FROM setting
WHERE key = $1
LIMIT 1
`

func (q *Queries) GetSetting(ctx context.Context, key string) (Setting, error) {
	row := q.db.QueryRowContext(ctx, getSetting, key)
	var i Setting
	err := row.Scan(
		&i.ID,
		&i.Key,
		&i.Value,
		&i.IsVisibleOnUi,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getSettings = `-- name: GetSettings :many
SELECT id, key, value, is_visible_on_ui, created_at, updated_at
FROM setting
ORDER BY key
`

func (q *Queries) GetSettings(ctx context.Context) ([]Setting, error) {
	rows, err := q.db.QueryContext(ctx, getSettings)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Setting
	for rows.Next() {
		var i Setting
		if err := rows.Scan(
			&i.ID,
			&i.Key,
			&i.Value,
			&i.IsVisibleOnUi,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUser = `-- name: GetUser :one
SELECT users.id,
       users.first_name,
       users.last_name,
       users.email,
       users.role_id,
       role.name    as role_name,
       users.group_ids,
       users.company_id,
       company.name as company_name,
       users.password_hash,
       users.is_active,
       users.password_invalidated,
       users.created_at,
       users.updated_at
FROM users
         INNER JOIN role ON role.id = users.role_id
         INNER JOIN company ON company.id = users.company_id
WHERE users.id = $1
LIMIT 1
`

type GetUserRow struct {
	ID                  int64
	FirstName           string
	LastName            string
	Email               string
	RoleID              int32
	RoleName            string
	GroupIds            json.RawMessage
	CompanyID           int32
	CompanyName         string
	PasswordHash        string
	IsActive            bool
	PasswordInvalidated bool
	CreatedAt           time.Time
	UpdatedAt           time.Time
}

func (q *Queries) GetUser(ctx context.Context, id int64) (GetUserRow, error) {
	row := q.db.QueryRowContext(ctx, getUser, id)
	var i GetUserRow
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Email,
		&i.RoleID,
		&i.RoleName,
		&i.GroupIds,
		&i.CompanyID,
		&i.CompanyName,
		&i.PasswordHash,
		&i.IsActive,
		&i.PasswordInvalidated,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT users.id,
       users.first_name,
       users.last_name,
       users.email,
       users.role_id,
       role.name    as role_name,
       users.group_ids,
       users.company_id,
       company.name as company_name,
       users.password_hash,
       users.is_active,
       users.password_invalidated,
       users.created_at,
       users.updated_at,
       company.namespace as company_namespace
FROM users
         INNER JOIN role ON role.id = users.role_id
         INNER JOIN company ON company.id = users.company_id
WHERE users.email = $1
LIMIT 1
`

type GetUserByEmailRow struct {
	ID                  int64
	FirstName           string
	LastName            string
	Email               string
	RoleID              int32
	RoleName            string
	GroupIds            json.RawMessage
	CompanyID           int32
	CompanyName         string
	PasswordHash        string
	IsActive            bool
	PasswordInvalidated bool
	CreatedAt           time.Time
	UpdatedAt           time.Time
	CompanyNamespace    string
}

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (GetUserByEmailRow, error) {
	row := q.db.QueryRowContext(ctx, getUserByEmail, email)
	var i GetUserByEmailRow
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Email,
		&i.RoleID,
		&i.RoleName,
		&i.GroupIds,
		&i.CompanyID,
		&i.CompanyName,
		&i.PasswordHash,
		&i.IsActive,
		&i.PasswordInvalidated,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.CompanyNamespace,
	)
	return i, err
}

const getUserGroupByID = `-- name: GetUserGroupByID :one
SELECT id, name, is_system, company_id, created_at, updated_at
FROM user_group
WHERE id = $1
LIMIT 1
`

func (q *Queries) GetUserGroupByID(ctx context.Context, id int32) (UserGroup, error) {
	row := q.db.QueryRowContext(ctx, getUserGroupByID, id)
	var i UserGroup
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.IsSystem,
		&i.CompanyID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getUserGroups = `-- name: GetUserGroups :many
SELECT id, name, is_system, company_id, created_at, updated_at
FROM user_group
WHERE company_id = $1
ORDER BY name
`

func (q *Queries) GetUserGroups(ctx context.Context, companyID int32) ([]UserGroup, error) {
	rows, err := q.db.QueryContext(ctx, getUserGroups, companyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []UserGroup
	for rows.Next() {
		var i UserGroup
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.IsSystem,
			&i.CompanyID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUsers = `-- name: GetUsers :many
SELECT id, first_name, last_name, email, role_id, group_ids, company_id, password_hash, is_active, password_invalidated, created_at, updated_at
FROM users
WHERE company_id = $1
ORDER BY first_name
`

func (q *Queries) GetUsers(ctx context.Context, companyID int32) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, getUsers, companyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.FirstName,
			&i.LastName,
			&i.Email,
			&i.RoleID,
			&i.GroupIds,
			&i.CompanyID,
			&i.PasswordHash,
			&i.IsActive,
			&i.PasswordInvalidated,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getVisibleSettings = `-- name: GetVisibleSettings :many
SELECT id, key, value, is_visible_on_ui, created_at, updated_at
FROM setting
WHERE is_visible_on_ui = true
ORDER BY key
`

func (q *Queries) GetVisibleSettings(ctx context.Context) ([]Setting, error) {
	rows, err := q.db.QueryContext(ctx, getVisibleSettings)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Setting
	for rows.Next() {
		var i Setting
		if err := rows.Scan(
			&i.ID,
			&i.Key,
			&i.Value,
			&i.IsVisibleOnUi,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updatePasswordHash = `-- name: UpdatePasswordHash :exec
UPDATE users
SET password_hash = $1
WHERE id = $2
`

type UpdatePasswordHashParams struct {
	PasswordHash string
	ID           int64
}

func (q *Queries) UpdatePasswordHash(ctx context.Context, arg UpdatePasswordHashParams) error {
	_, err := q.db.ExecContext(ctx, updatePasswordHash, arg.PasswordHash, arg.ID)
	return err
}

const updateSetting = `-- name: UpdateSetting :exec
UPDATE setting
SET value = $1 AND is_visible_on_ui = $2
WHERE key = $3
`

type UpdateSettingParams struct {
	Value         json.RawMessage
	IsVisibleOnUi bool
	Key           string
}

func (q *Queries) UpdateSetting(ctx context.Context, arg UpdateSettingParams) error {
	_, err := q.db.ExecContext(ctx, updateSetting, arg.Value, arg.IsVisibleOnUi, arg.Key)
	return err
}
