/****** Object:  Table [dbo].[activating_merchant]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[activating_merchant] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [merchant_id]   [VARCHAR](64)            NOT NULL,
    [merchant_name] [VARCHAR](64)            NOT NULL,
    [platform]      [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_activating_merchant] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[audit_activity]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[audit_activity] (
    [id]                    [BIGINT] IDENTITY (1, 1) NOT NULL,
    [user_id]               [BIGINT]                 NOT NULL,
    [session_id]            [BIGINT]                 NULL,
    [selection_id]          [BIGINT]                 NULL,
    [activity_date]         [DATETIME2](6)           NOT NULL,
    [response_success_date] [DATETIME2](6)           NULL,
    [response_failure_date] [DATETIME2](6)           NULL,
    [system_note]           [VARCHAR](MAX)           NULL,
    [client_ip_address]     [VARCHAR](256)           NULL,
    [type]                  [VARCHAR](64)            NOT NULL,
    [is_encrypted]          [BIT]                    NULL,
    CONSTRAINT [pk_audit_activity] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
    TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[audit_balance_adjustment_activity]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[audit_balance_adjustment_activity] (
    [id]               [BIGINT] IDENTITY (1, 1) NOT NULL,
    [identifier_type]  [VARCHAR](64)            NOT NULL,
    [identifier]       [VARCHAR](64)            NOT NULL,
    [platform]         [VARCHAR](64)            NOT NULL,
    [amount]           [NUMERIC](18, 2)         NOT NULL,
    [transaction_type] [VARCHAR](64)            NOT NULL,
    [adjusted_date]    [DATETIME2](6)           NOT NULL,
    [adjusted_by]      [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_audit_balance_adjustment_activity] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[audit_card_replacement_activity]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[audit_card_replacement_activity] (
    [id]                 [BIGINT] IDENTITY (1, 1) NOT NULL,
    [identifier_type]    [VARCHAR](64)            NOT NULL,
    [identifier]         [VARCHAR](64)            NOT NULL,
    [platform]           [VARCHAR](64)            NOT NULL,
    [last_replaced_date] [DATETIME2](6)           NOT NULL,
    CONSTRAINT [pk_audit_card_replacement_activity] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[balance_adjustment_limit]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[balance_adjustment_limit] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [min]           [FLOAT]                  NULL,
    [max]           [FLOAT]                  NULL,
    [limit_level]   [VARCHAR](10)            NULL,
    [limit_id]      [BIGINT]                 NULL,
    [allowed_min]   [FLOAT]                  NULL,
    [allowed_max]   [FLOAT]                  NULL,
    [permission_id] [BIGINT]                 NOT NULL,
    CONSTRAINT [cca_limits_id_key] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[c2c_request]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[c2c_request] (
    [id]               [BIGINT] IDENTITY (1, 1) NOT NULL,
    [from_customer_id] [VARCHAR](32)            NOT NULL,
    [to_customer_id]   [VARCHAR](32)            NOT NULL,
    [status]           [VARCHAR](32)            NOT NULL,
    [amount]           [NUMERIC](18, 0)         NOT NULL,
    [reason]           [VARCHAR](512)           NOT NULL,
    [comment]          [VARCHAR](512)           NULL,
    [created_date]     [DATETIME2](6)           NOT NULL,
    [created_by]       [BIGINT]                 NOT NULL,
    [modified_date]    [DATETIME2](6)           NOT NULL,
    [modified_by]      [BIGINT]                 NOT NULL,
    [session_id]       [BIGINT]                 NOT NULL,
    [platform]         [VARCHAR](64)            NOT NULL,
    [selection_id]     [BIGINT]                 NOT NULL,
    [transfer_fee]     [NUMERIC](3, 2)          NOT NULL,
    CONSTRAINT [pk_c2c_request] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[call_detail]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[call_detail] (
    [id]                        [BIGINT] IDENTITY (1, 1)
    NOT FOR REPLICATION                        NOT NULL,
    [created_date]              [DATETIME2](6) NULL,
    [encrypted_caller_name]     [VARCHAR](400) NULL,
    [encrypted_callback_number] [VARCHAR](75)  NULL,
    [uid]                       [VARCHAR](255) NULL,
    [dnis]                      [VARCHAR](30)  NULL,
    [ani]                       [VARCHAR](60)  NULL,
    [mobile_reload_number]      [VARCHAR](30)  NULL,
    [proxy_number]              [VARCHAR](255) NULL,
    [platform]                  [VARCHAR](255) NULL,
    [wrapped_up_date]           [DATETIME2](6) NULL,
    [auto_wrapped]              [BIT]          NULL,
    [auto_wrap_type]            [VARCHAR](64)  NULL,
    [session_id]                [BIGINT]       NULL,
    [user_id]                   [BIGINT]       NULL,
    [call_id]                   [VARCHAR](256) NULL,
    [call_id_key]               [VARCHAR](256) NULL,
    [connected_date]            [DATETIME2](6) NULL,
    [disconnected_date]         [DATETIME2](6) NULL,
    [disconnect_type]           [VARCHAR](64)  NULL,
    [wrap_up_sent_date]         [DATETIME2](6) NULL,
    [wrap_up_success]           [BIT]          NULL,
    [wrap_up_recorded]          [BIT]          NULL,
    [serial_number]             [VARCHAR](64)  NULL,
    [pin]                       [VARCHAR](64)  NULL,
    [van16]                     [VARCHAR](64)  NULL,
    [original_ani]              [VARCHAR](64)  NULL,
    [original_dnis]             [VARCHAR](64)  NULL,
    [last_four]                 [VARCHAR](4)   NULL,
    CONSTRAINT [pk_call_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 70)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_group]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_group] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [system_name]   [VARCHAR](64)            NOT NULL,
    [display_name]  [VARCHAR](64)            NOT NULL,
    [description]   [VARCHAR](512)           NULL,
    [active]        [BIT]                    NOT NULL,
    [locked]        [BIT]                    NOT NULL,
    [created_date]  [DATETIME2](6)           NOT NULL,
    [created_by]    [BIGINT]                 NOT NULL,
    [modified_date] [DATETIME2](6)           NOT NULL,
    [modified_by]   [BIGINT]                 NOT NULL,
    CONSTRAINT [pk_cca_group] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_group_owner]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_group_owner] (
    [group_id] [BIGINT] NOT NULL,
    [user_id]  [BIGINT] NOT NULL,
    CONSTRAINT [pk_cca_group_owner] PRIMARY KEY CLUSTERED
        (
            [group_id] ASC,
            [user_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_group_permission]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_group_permission] (
    [group_id]      [BIGINT] NOT NULL,
    [permission_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_cca_group_permission] PRIMARY KEY CLUSTERED
        (
            [group_id] ASC,
            [permission_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_limit]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_limit] (
    [id]           [BIGINT] IDENTITY (1, 1) NOT NULL,
    [system_name]  [VARCHAR](255)           NULL,
    [display_name] [VARCHAR](255)           NULL,
    [created_date] [TIME](6)                NULL,
    CONSTRAINT [pk_cca_limit] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_property]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_property] (
    [id]           [BIGINT] IDENTITY (1, 1) NOT NULL,
    [system_name]  [VARCHAR](256)           NOT NULL,
    [display_name] [VARCHAR](256)           NOT NULL,
    [description]  [VARCHAR](256)           NULL,
    [value]        [VARCHAR](512)           NULL,
    CONSTRAINT [pk_cca_property_id] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_role]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_role] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [system_name]   [VARCHAR](64)            NOT NULL,
    [display_name]  [VARCHAR](64)            NOT NULL,
    [description]   [VARCHAR](512)           NULL,
    [active]        [BIT]                    NOT NULL,
    [locked]        [BIT]                    NOT NULL,
    [group_id]      [BIGINT]                 NOT NULL,
    [created_date]  [DATETIME2](6)           NOT NULL,
    [created_by]    [BIGINT]                 NOT NULL,
    [modified_date] [DATETIME2](6)           NOT NULL,
    [modified_by]   [BIGINT]                 NOT NULL,
    CONSTRAINT [pk_cca_role] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_role_admin]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_role_admin] (
    [role_id] [BIGINT] NOT NULL,
    [user_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_cca_role_admin] PRIMARY KEY CLUSTERED
        (
            [role_id] ASC,
            [user_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_role_member]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_role_member] (
    [role_id] [BIGINT] NOT NULL,
    [user_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_cca_role_member] PRIMARY KEY CLUSTERED
        (
            [role_id] ASC,
            [user_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_role_permission]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_role_permission] (
    [role_id]       [BIGINT] NOT NULL,
    [permission_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_cca_role_permission] PRIMARY KEY CLUSTERED
        (
            [role_id] ASC,
            [permission_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_session]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_session] (
    [id]                       [BIGINT] IDENTITY (1, 1)
    NOT FOR REPLICATION                       NOT NULL,
    [created_date]             [DATETIME2](6) NULL,
    [user_id]                  [BIGINT]       NULL,
    [note_id]                  [BIGINT]       NULL,
    [wrap_up_code_id]          [BIGINT]       NULL,
    [session_queue_id]         [BIGINT]       NULL,
    [wrap_up_code_category_id] [BIGINT]       NULL,
    [closed_date]              [DATETIME2](6) NULL,
    [status]                   [VARCHAR](64)  NULL,
    [session_class]            [VARCHAR](64)  NOT NULL,
    [session_type]             [VARCHAR](64)  NOT NULL,
    [team_id]                  [BIGINT]       NULL,
    [created_by]               [BIGINT]       NULL,
    [modified_date]            [DATETIME2](7) NULL,
    [modified_by]              [BIGINT]       NULL,
    [reason]                   [VARCHAR](64)  NULL,
    CONSTRAINT [pk_cca_session] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_session_autowrap]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_session_autowrap] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [session_id]    [BIGINT]                 NOT NULL,
    [autowrap_date] [DATETIME2](6)           NOT NULL,
    CONSTRAINT [pk_cca_session_autowrap] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cca_user]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cca_user] (
    [id]                        [BIGINT] IDENTITY (1, 1) NOT NULL,
    [username]                  [VARCHAR](255)           NULL,
    [first_name]                [VARCHAR](64)            NULL,
    [last_name]                 [VARCHAR](64)            NULL,
    [email]                     [VARCHAR](64)            NULL,
    [active]                    [BIT]                    NOT NULL,
    [pref_show_billable_only]   [BIT]                    NOT NULL,
    [pref_default_data_source]  [VARCHAR](64)            NOT NULL,
    [created_date]              [DATETIME2](6)           NOT NULL,
    [created_by]                [BIGINT]                 NOT NULL,
    [modified_date]             [DATETIME2](6)           NOT NULL,
    [modified_by]               [BIGINT]                 NOT NULL,
    [default_partner_id]        [BIGINT]                 NULL,
    [company]                   [VARCHAR](64)            NULL,
    [department]                [VARCHAR](64)            NULL,
    [employee_id]               [VARCHAR](64)            NULL,
    [title]                     [VARCHAR](64)            NULL,
    [display_name]              [VARCHAR](64)            NULL,
    [mobile]                    [VARCHAR](64)            NULL,
    [phone]                     [VARCHAR](64)            NULL,
    [pref_session_mode]         [VARCHAR](64)            NOT NULL,
    [pref_dock_mode]            [VARCHAR](64)            NOT NULL,
    [pref_default_search_type]  [VARCHAR](64)            NOT NULL,
    [pref_summary_mode]         [VARCHAR](64)            NULL,
    [pref_default_session_type] [VARCHAR](64)            NULL,
    [pref_dont_show_whats_new]  [BIT]                    NULL,
    [last_login_date]           [DATETIME2](7)           NULL,
    CONSTRAINT [pk_user_id] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comment]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comment] (
    [id]             [BIGINT] IDENTITY (1, 1) NOT NULL,
    [created_date]   [DATETIME2](6)           NOT NULL,
    [encrypted_note] [VARCHAR](MAX)           NULL,
    [modified_date]  [DATETIME2](7)           NOT NULL,
    [created_by]     [BIGINT]                 NOT NULL,
    [modified_by]    [BIGINT]                 NOT NULL,
    [is_private]     [BIT]                    NOT NULL,
    CONSTRAINT [pk_comment] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
    TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customer_detail]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer_detail] (
    [id]             [BIGINT] IDENTITY (1, 1) NOT NULL,
    [session_id]     [BIGINT]                 NULL,
    [first_name]     [VARCHAR](64)            NULL,
    [last_name]      [VARCHAR](64)            NULL,
    [date_of_birth]  [VARCHAR](64)            NULL,
    [line_1]         [VARCHAR](64)            NULL,
    [line_2]         [VARCHAR](64)            NULL,
    [city]           [VARCHAR](64)            NULL,
    [state]          [VARCHAR](64)            NULL,
    [postal_code]    [VARCHAR](64)            NULL,
    [phone_number]   [VARCHAR](64)            NULL,
    [ani]            [VARCHAR](64)            NULL,
    [callback_time]  [VARCHAR](64)            NULL,
    [language]       [VARCHAR](64)            NULL,
    [contact_method] [VARCHAR](64)            NULL,
    [email_address]  [VARCHAR](64)            NULL,
    CONSTRAINT [pk_customer_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detail_dispute]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detail_dispute] (
    [id]              [BIGINT] IDENTITY (1, 1) NOT NULL,
    [session_id]      [BIGINT]                 NOT NULL,
    [identifier_id]   [BIGINT]                 NOT NULL,
    [delivery_method] [VARCHAR](64)            NOT NULL,
    [created_date]    [DATETIME2](7)           NOT NULL,
    CONSTRAINT [pk_detail_dispute] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detail_dispute_transaction]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detail_dispute_transaction] (
    [id]                    [BIGINT] IDENTITY (1, 1) NOT NULL,
    [detail_dispute_id]     [BIGINT]                 NOT NULL,
    [transaction_id]        [VARCHAR](32)            NOT NULL,
    [delivery_channel_code] [VARCHAR](32)            NULL,
    [request_code]          [VARCHAR](32)            NULL,
    [response_code]         [VARCHAR](32)            NULL,
    [business_date]         [DATETIME2](7)           NULL,
    [amount]                [VARCHAR](32)            NOT NULL,
    [merchant_name]         [VARCHAR](32)            NULL,
    [reason]                [VARCHAR](64)            NULL,
    [card_number]           [VARCHAR](32)            NULL,
    CONSTRAINT [pk_detail_dispute_transaction] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[disputed_card_detail]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[disputed_card_detail] (
    [id]                     [BIGINT] IDENTITY (1, 1) NOT NULL,
    [session_id]             [BIGINT]                 NULL,
    [total_load_amount]      [VARCHAR](64)            NULL,
    [total_recovered_amount] [VARCHAR](64)            NULL,
    CONSTRAINT [pk_disputed_card_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[disputed_card_item_detail]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[disputed_card_item_detail] (
    [id]                      [BIGINT] IDENTITY (1, 1) NOT NULL,
    [disputed_card_detail_id] [BIGINT]                 NOT NULL,
    [workflow]                [VARCHAR](64)            NULL,
    [label]                   [VARCHAR](64)            NULL,
    [balance]                 [VARCHAR](64)            NULL,
    [note]                    [VARCHAR](512)           NULL,
    [initial_load_amount]     [VARCHAR](64)            NULL,
    [recovered_amount]        [VARCHAR](64)            NULL,
    [card_description]        [VARCHAR](64)            NULL,
    [card_id]                 [VARCHAR](64)            NULL,
    [serial_number]           [VARCHAR](64)            NULL,
    [van]                     [VARCHAR](64)            NULL,
    CONSTRAINT [pk_disputed_card_item_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[disputed_card_tag]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[disputed_card_tag] (
    [id]   [BIGINT] IDENTITY (1, 1) NOT NULL,
    [name] [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_disputed_card_tag] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gc_request]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gc_request] (
    [id]               [BIGINT] IDENTITY (1, 1) NOT NULL,
    [x95_code]         [VARCHAR](4)             NOT NULL,
    [request_code]     [VARCHAR](8)             NOT NULL,
    [request_value]    [VARCHAR](64)            NOT NULL,
    [transaction_type] [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_gc_request] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gc_response]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gc_response] (
    [id]             [BIGINT] IDENTITY (1, 1) NOT NULL,
    [response_code]  [VARCHAR](4)             NOT NULL,
    [response_value] [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_gc_response] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[identifier]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[identifier] (
    [id]              [BIGINT] IDENTITY (1, 1) NOT NULL,
    [identifier]      [VARCHAR](64)            NOT NULL,
    [identifier_type] [VARCHAR](64)            NOT NULL,
    [platform]        [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_identifier] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[identifier_comment]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[identifier_comment] (
    [identifier_id] [BIGINT] NOT NULL,
    [comment_id]    [BIGINT] NOT NULL,
    CONSTRAINT [pk_identifier_comment] PRIMARY KEY CLUSTERED
        (
            [identifier_id] ASC,
            [comment_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[law_enforcement_detail]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[law_enforcement_detail] (
    [session_id]   [BIGINT]                 NULL,
    [case_number]  [VARCHAR](64)            NULL,
    [badge_number] [VARCHAR](64)            NULL,
    [agency]       [VARCHAR](64)            NULL,
    [id]           [BIGINT] IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [pk_law_enforcement_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[merchant_detail]    Script Date: 12/8/2017 2:58:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[merchant_detail] (
    [id]                              [BIGINT] IDENTITY (1, 1) NOT NULL,
    [session_id]                      [BIGINT]                 NULL,
    [merchant_name]                   [VARCHAR](64)            NULL,
    [location_name]                   [VARCHAR](64)            NULL,
    [contact_name]                    [VARCHAR](64)            NULL,
    [contact_title]                   [VARCHAR](64)            NULL,
    [contact_phone]                   [VARCHAR](64)            NULL,
    [line_1]                          [VARCHAR](64)            NULL,
    [line_2]                          [VARCHAR](64)            NULL,
    [city]                            [VARCHAR](64)            NULL,
    [state]                           [VARCHAR](64)            NULL,
    [postal_code]                     [VARCHAR](64)            NULL,
    [purchased_date]                  [DATETIME2](7)           NULL,
    [first_redemption_attempted_date] [DATETIME2](7)           NULL,
    [deactivated_date]                [DATETIME2](7)           NULL,
    [last_reloaded_date]              [DATETIME2](7)           NULL,
    [merchant_legacy_id]              [VARCHAR](10)            NULL,
    CONSTRAINT [pk_merchant_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[op_code]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[op_code] (
    [id]               [BIGINT] IDENTITY (1, 1) NOT NULL,
    [code]             [VARCHAR](4)             NOT NULL,
    [request_value]    [VARCHAR](64)            NOT NULL,
    [response_value]   [VARCHAR](64)            NOT NULL,
    [transaction_type] [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_op_code] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[partner]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[partner] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [name]          [VARCHAR](256)           NOT NULL,
    [ivr_dnis]      [VARCHAR](1024)          NOT NULL,
    [permission_id] [BIGINT]                 NULL,
    CONSTRAINT [pk_partner] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permission]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permission] (
    [id]                     [BIGINT] IDENTITY (1, 1) NOT NULL,
    [system_name]            [VARCHAR](64)            NOT NULL,
    [display_name]           [VARCHAR](64)            NOT NULL,
    [description]            [VARCHAR](512)           NULL,
    [permission_category_id] [BIGINT]                 NOT NULL,
    [active]                 [BIT]                    NOT NULL,
    [created_date]           [DATETIME2](6)           NOT NULL,
    [created_by]             [BIGINT]                 NOT NULL,
    [modified_date]          [DATETIME2](6)           NOT NULL,
    [modified_by]            [BIGINT]                 NOT NULL,
    CONSTRAINT [pk_permission] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permission_category]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permission_category] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [system_name]   [VARCHAR](64)            NOT NULL,
    [display_name]  [VARCHAR](64)            NOT NULL,
    [description]   [VARCHAR](512)           NULL,
    [locked]        [BIT]                    NULL,
    [created_date]  [DATETIME2](6)           NOT NULL,
    [created_by]    [BIGINT]                 NOT NULL,
    [modified_date] [DATETIME2](6)           NOT NULL,
    [modified_by]   [BIGINT]                 NOT NULL,
    CONSTRAINT [pk_permission_category] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[queue_wrap_up_code_category]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[queue_wrap_up_code_category] (
    [queue_id]                 [BIGINT] NOT NULL,
    [wrap_up_code_category_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_queue_wrap_up_code_category] PRIMARY KEY CLUSTERED
        (
            [queue_id] ASC,
            [wrap_up_code_category_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[receipt_card_detail]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[receipt_card_detail] (
    [id]                  [BIGINT] IDENTITY (1, 1) NOT NULL,
    [receipt_detail_id]   [BIGINT]                 NOT NULL,
    [van_16]              [VARCHAR](64)            NULL,
    [initial_load_amount] [VARCHAR](64)            NULL,
    [product_type]        [VARCHAR](64)            NULL,
    [package_van]         [VARCHAR](64)            NULL,
    [serial_number]       [VARCHAR](64)            NULL,
    CONSTRAINT [pk_receipt_card_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[receipt_detail]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[receipt_detail] (
    [id]                 [BIGINT] IDENTITY (1, 1) NOT NULL,
    [session_id]         [BIGINT]                 NULL,
    [receipt_id]         [VARCHAR](64)            NULL,
    [transaction_date]   [DATETIME2](7)           NULL,
    [total_amount]       [VARCHAR](64)            NULL,
    [payment_method]     [VARCHAR](64)            NULL,
    [transaction_amount] [VARCHAR](64)            NULL,
    [transaction_time]   [VARCHAR](64)            NULL,
    CONSTRAINT [pk_receipt_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[refund_request_detail]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[refund_request_detail] (
    [session_id]     [BIGINT]                 NULL,
    [amount]         [DECIMAL](9, 2)          NULL,
    [name]           [VARCHAR](64)            NULL,
    [line_1]         [VARCHAR](64)            NULL,
    [line_2]         [VARCHAR](64)            NULL,
    [city]           [VARCHAR](64)            NULL,
    [state]          [VARCHAR](2)             NULL,
    [postal_code]    [VARCHAR](7)             NULL,
    [ani]            [VARCHAR](10)            NULL,
    [requested_date] [DATETIME2](7)           NULL,
    [approved_date]  [DATETIME2](7)           NULL,
    [id]             [BIGINT] IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [pk_refund_request_detail] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[report]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[report] (
    [id]       [BIGINT] IDENTITY (1, 1) NOT NULL,
    [name]     [VARCHAR](255)           NOT NULL,
    [status]   [BIT]                    NULL,
    [snippet]  [VARCHAR](5000)          NOT NULL,
    [override] [BIT]                    NOT NULL,
    CONSTRAINT [pk_report_id] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[report_role]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[report_role] (
    [report_id] [BIGINT] NOT NULL,
    [role_id]   [BIGINT] NOT NULL,
    CONSTRAINT [pk_report_role] PRIMARY KEY CLUSTERED
        (
            [report_id] ASC,
            [role_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[selection]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[selection] (
    [id]                  [BIGINT] IDENTITY (1, 1)
    NOT FOR REPLICATION                  NOT NULL,
    [search_complete]     [BIT]          NULL,
    [results_found]       [BIT]          NULL,
    [selection_made]      [BIT]          NULL,
    [external_session_id] [VARCHAR](64)  NULL,
    [partner_id]          [BIGINT]       NULL,
    [type]                [VARCHAR](64)  NULL,
    [platform]            [VARCHAR](64)  NULL,
    [session_id]          [BIGINT]       NULL,
    [deleted_date]        [DATETIME2](7) NULL,
    CONSTRAINT [pk_selection] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[selection_identifier]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[selection_identifier] (
    [selection_id]  [BIGINT] NOT NULL,
    [identifier_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_selection_identifier] PRIMARY KEY CLUSTERED
        (
            [selection_id] ASC,
            [identifier_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[session_comment]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[session_comment] (
    [session_id] [BIGINT] NOT NULL,
    [comment_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_session_comment] PRIMARY KEY CLUSTERED
        (
            [session_id] ASC,
            [comment_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[session_queue]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[session_queue] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [i3_name]       [VARCHAR](255)           NOT NULL,
    [active]        [BIT]                    NULL,
    [robohelp_id]   [BIGINT]                 NULL,
    [display_name]  [VARCHAR](MAX)           NULL,
    [autowrap_time] [INT]                    NULL,
    [default_note]  [VARCHAR](MAX)           NULL,
    [autoclose]     [BIT]                    NOT NULL,
    [type]          [VARCHAR](64)            NOT NULL,
    [locale]        [VARCHAR](64)            NOT NULL,
    [system_name]   [VARCHAR](64)            NOT NULL,
    [permission_id] [BIGINT]                 NOT NULL,
    CONSTRAINT [pk_queue_id] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
    TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[session_queue_session_type]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[session_queue_session_type] (
    [id]               [BIGINT] IDENTITY (1, 1) NOT NULL,
    [session_queue_id] [BIGINT]                 NOT NULL,
    [session_type]     [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_session_queue_session_type] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[short_pay]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[short_pay] (
    [id]              [BIGINT] IDENTITY (1, 1) NOT NULL,
    [merchant_id]     [VARCHAR](64)            NOT NULL,
    [merchant_name]   [VARCHAR](256)           NOT NULL,
    [location_id]     [VARCHAR](64)            NOT NULL,
    [location_name]   [VARCHAR](256)           NOT NULL,
    [terminal_id]     [VARCHAR](64)            NOT NULL,
    [terminal_number] [VARCHAR](256)           NOT NULL,
    CONSTRAINT [pk_short_pay] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[team]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[team] (
    [id]            [BIGINT] IDENTITY (1, 1) NOT NULL,
    [system_name]   [VARCHAR](64)            NOT NULL,
    [display_name]  [VARCHAR](64)            NOT NULL,
    [description]   [VARCHAR](512)           NULL,
    [created_date]  [DATETIME2](7)           NOT NULL,
    [created_by]    [BIGINT]                 NOT NULL,
    [modified_date] [DATETIME2](7)           NOT NULL,
    [modified_by]   [BIGINT]                 NOT NULL,
    CONSTRAINT [pk_team] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[team_member]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[team_member] (
    [team_id] [BIGINT] NOT NULL,
    [user_id] [BIGINT] NOT NULL,
    CONSTRAINT [pk_team_member] PRIMARY KEY CLUSTERED
        (
            [team_id] ASC,
            [user_id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[togglz]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[togglz] (
    [feature_name]    [VARCHAR](100)  NOT NULL,
    [feature_enabled] [INT]           NULL,
    [strategy_id]     [VARCHAR](200)  NULL,
    [strategy_params] [VARCHAR](2000) NULL,
    CONSTRAINT [togglz_pkey] PRIMARY KEY CLUSTERED
        (
            [feature_name] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[troubleshooting_session]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[troubleshooting_session] (
    [id]              [BIGINT] IDENTITY (1, 1) NOT NULL,
    [connector]       [VARCHAR](64)            NOT NULL,
    [connectee]       [VARCHAR](64)            NOT NULL,
    [start_date]      [DATETIME2](6)           NOT NULL,
    [expiration_date] [DATETIME2](6)           NOT NULL,
    CONSTRAINT [pk_troubleshooting_session] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vms_file_upload]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vms_file_upload] (
    [id]          [BIGINT] IDENTITY (1, 1) NOT NULL,
    [customer_id] [BIGINT]                 NOT NULL,
    [upload_date] [DATETIME2](6)           NULL,
    [hash_code]   [VARCHAR](256)           NULL,
    CONSTRAINT [vms_file_upload_id_primary_key] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vms_product_code]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vms_product_code] (
    [id]         [BIGINT] IDENTITY (1, 1) NOT NULL,
    [partner_id] [BIGINT]                 NOT NULL,
    [vms_id]     [VARCHAR](64)            NOT NULL,
    [name]       [VARCHAR](64)            NOT NULL,
    [code]       [VARCHAR](64)            NOT NULL,
    CONSTRAINT [pk_vms_product_code] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vms_product_type]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vms_product_type] (
    [id]                  [BIGINT] IDENTITY (1, 1) NOT NULL,
    [vms_product_code_id] [BIGINT]                 NOT NULL,
    [vms_id]              [VARCHAR](64)            NOT NULL,
    [name]                [VARCHAR](64)            NOT NULL,
    [enabled]             [BIT]                    NULL,
    CONSTRAINT [pk_vms_product_type] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wizard_message]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wizard_message] (
    [id]              [BIGINT] IDENTITY (1, 1) NOT NULL,
    [wizard_key]      [VARCHAR](64)            NOT NULL,
    [message_type]    [VARCHAR](64)            NOT NULL,
    [page]            [INT]                    NOT NULL,
    [message]         [TEXT]                   NOT NULL,
    [failure_message] [TEXT]                   NULL,
    CONSTRAINT [pk_wizard_messages] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
    TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wrap_up_code]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wrap_up_code] (
    [id]                       [BIGINT] IDENTITY (1, 1) NOT NULL,
    [i3_name]                  [VARCHAR](255)           NOT NULL,
    [wrap_up_code_category_id] [BIGINT]                 NULL,
    [active]                   [BIT]                    NULL,
    [display_name]             [VARCHAR](255)           NULL,
    [locked]                   [BIT]                    NULL,
    CONSTRAINT [pk_wrap_up_code_id] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wrap_up_code_category]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wrap_up_code_category] (
    [id]           [BIGINT] IDENTITY (1, 1) NOT NULL,
    [i3_name]      [VARCHAR](255)           NOT NULL,
    [active]       [BIT]                    NULL,
    [display_name] [VARCHAR](255)           NULL,
    CONSTRAINT [pk_wrap_up_code_category_id] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[balance_adjustment_limit] ON

INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 1, 0, 20, N'1', 1, 1, 20, 89 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 2, 0, 50, N'2', 1, 20, 100, 90 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 3, 0, 200, N'3', 1, 100, 200, 91 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 4, 0, 50000, N'4', 1, 200, 50000, 92 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 5, 0, 50000, N'5', 1, 200, 50000, 93 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 6, 0, 200, N'1', 2, 1, 500, 89 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 7, 0, 5000, N'2', 2, 500, 8000, 90 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 8, 0, 10000, N'3', 2, 8000, 15000, 91 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 9, 0, 15000, N'4', 2, 15000, 50000, 92 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 10, 0, 75000, N'5', 2, 50000, 100000, 93 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 11, 0, 200, N'1', 3, 1, 500, 89 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 12, 0, 5000, N'2', 3, 500, 8000, 90 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 13, 0, 10000, N'3', 3, 8000, 15000, 91 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 14, 0, 15000, N'4', 3, 15000, 50000, 92 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 15, 0, 75000, N'5', 3, 50000, 100000, 93 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 16, 0.01, 100, N'1', 4, 0.01, 500, 89 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 17, 0.01, 500, N'2', 4, 0.01, 1000, 90 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 18, 0.01, 1000, N'3', 4, 0.01, 2000, 91 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 19, 0.01, 1000, N'4', 4, 0.01, 5000, 92 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 20, 0.01, 10000, N'5', 4, 0.01, 10000, 93 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 21, 0, 100, N'1', 5, 1, 250, 89 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 22, 0, 500, N'2', 5, 250, 500, 90 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 23, 0, 500, N'3', 5, 500, 1000, 91 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 24, 0, 1000, N'4', 5, 1000, 5000, 92 )
INSERT [dbo].[balance_adjustment_limit] ([id], [min], [max], [limit_level], [limit_id], [allowed_min], [allowed_max], [permission_id])
VALUES ( 25, 0, 75000, N'5', 5, 5000, 100000, 93 )
SET IDENTITY_INSERT [dbo].[balance_adjustment_limit] OFF
SET IDENTITY_INSERT [dbo].[cca_group] ON

INSERT [dbo].[cca_group] ([id], [system_name], [display_name], [description], [active], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 1, N'SYSTEM_ADMINISTRATION', N'System Administration', N'System Administration Group', 1, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:40:52.7930000' AS DATETIME2 ),
         1 )
SET IDENTITY_INSERT [dbo].[cca_group] OFF
INSERT [dbo].[cca_group_owner] ([group_id], [user_id]) VALUES ( 1, 1 )
INSERT [dbo].[cca_group_owner] ([group_id], [user_id]) VALUES ( 1, 3 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 13 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 14 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 15 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 16 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 17 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 18 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 19 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 20 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 21 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 22 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 23 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 24 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 25 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 26 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 27 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 28 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 29 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 30 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 31 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 32 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 33 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 34 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 35 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 36 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 37 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 38 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 39 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 40 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 41 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 42 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 43 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 44 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 45 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 46 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 47 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 48 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 49 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 50 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 51 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 52 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 53 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 54 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 55 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 56 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 57 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 58 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 59 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 60 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 61 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 62 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 63 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 64 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 65 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 66 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 67 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 68 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 69 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 70 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 71 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 72 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 73 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 74 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 75 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 76 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 77 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 78 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 79 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 80 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 81 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 82 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 83 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 84 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 85 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 88 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 89 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 90 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 91 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 92 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 93 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 94 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 95 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 96 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 97 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 98 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 99 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 100 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 101 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 102 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 103 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 104 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 105 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 106 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 107 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4096 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4097 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4098 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4099 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4100 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4101 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4102 )
GO
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4103 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4104 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4105 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4106 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4107 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4108 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4109 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4110 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4111 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4112 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4113 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4114 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4115 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4116 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4118 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4120 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4121 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4122 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4123 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4124 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4140 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4141 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4142 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4143 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4144 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4145 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4146 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4147 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4148 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4149 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4150 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4151 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4152 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4298 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4299 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4300 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4301 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4302 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4303 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4304 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4305 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4306 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4307 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4309 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4310 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4311 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4312 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4314 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4315 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4316 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4317 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4318 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4319 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4320 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4322 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4323 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4324 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4325 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4327 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4328 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4329 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4330 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4331 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4332 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4333 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4335 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4336 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4338 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4339 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4340 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4341 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4342 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4343 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4344 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4345 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4346 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4347 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4348 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4349 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4350 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4351 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4352 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4353 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4354 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4355 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4356 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4357 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4358 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4359 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4360 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4361 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4362 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4363 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4364 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4365 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4366 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4367 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4368 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4369 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4370 )
GO
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4371 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4372 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4373 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4374 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4375 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4376 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4377 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4378 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4379 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4380 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4381 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4382 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4383 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4384 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4385 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4386 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4387 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4388 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4389 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4390 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4391 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4392 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4393 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4394 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4395 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4396 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4397 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4398 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4399 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4400 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4401 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4402 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4403 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4404 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4405 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4406 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4407 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4408 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4409 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4410 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4411 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4412 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4413 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4414 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4415 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4416 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4417 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4418 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4419 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4420 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4421 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4422 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4423 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4424 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4425 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4426 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4427 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4428 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4429 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4430 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4431 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4432 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4433 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4434 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4435 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4436 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4437 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4438 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4439 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4440 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4441 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4442 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4443 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4444 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4445 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4446 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4447 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4448 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4449 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4450 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4451 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4452 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4453 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4454 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4455 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4456 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4457 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4458 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4459 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4460 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4461 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4462 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4463 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4464 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4465 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4466 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4467 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4468 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4469 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4470 )
GO
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4471 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4472 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4473 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4474 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4475 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4476 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4477 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4478 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4479 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4480 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4481 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4482 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4483 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4484 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4485 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4486 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4487 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4488 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4489 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4490 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4491 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4492 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4493 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4494 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4495 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4496 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4497 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4498 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4499 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4500 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4501 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4502 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4503 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4504 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4505 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4506 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4507 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4508 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4509 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4510 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4511 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4512 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4513 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4514 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4515 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4516 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4517 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4518 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4519 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4520 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4521 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4522 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4524 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4536 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4543 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4544 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4545 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4546 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4547 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4548 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4549 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4550 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4551 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4552 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4553 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4554 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4555 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4556 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4557 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4558 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4559 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4560 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4561 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4562 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4563 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4564 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4565 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4566 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4567 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4568 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4569 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4570 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4571 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4572 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4573 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4574 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4575 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4576 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4577 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4578 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4579 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4580 )
INSERT [dbo].[cca_group_permission] ([group_id], [permission_id]) VALUES ( 1, 4581 )
SET IDENTITY_INSERT [dbo].[cca_limit] ON

INSERT [dbo].[cca_limit] ([id], [system_name], [display_name], [created_date])
VALUES ( 1, N'DAILY_ADJUSTMENT_LIMIT', N'Daily Adjustment Limit per user', NULL )
INSERT [dbo].[cca_limit] ([id], [system_name], [display_name], [created_date])
VALUES ( 2, N'DAILY_CREDIT_ADJUSTMENT_AMOUNT', N'Daily Credit Adjustment Amount per user($)', NULL )
INSERT [dbo].[cca_limit] ([id], [system_name], [display_name], [created_date])
VALUES ( 3, N'DAILY_DEBIT_ADJUSTMENT_AMOUNT', N'Daily Debit Adjustment Amount per user ($)', NULL )
INSERT [dbo].[cca_limit] ([id], [system_name], [display_name], [created_date])
VALUES ( 4, N'CREDIT_DEBIT_AMOUNTS_ALLOWED', N'Credit/Debit Amounts Allowed ($)', NULL )
INSERT [dbo].[cca_limit] ([id], [system_name], [display_name], [created_date])
VALUES ( 5, N'ALLOW_CREDIT_OVER_INITIAL_BALANCE', N'Allow Credit Over Initial Balance ($)', NULL )
SET IDENTITY_INSERT [dbo].[cca_limit] OFF
SET IDENTITY_INSERT [dbo].[cca_property] ON

INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 1, N'DEFAULT_WRAP_UP_CODE_ID', N'Default Wrap-Up Code ID',
      N'The database ID of the Wrap-Up Code to be used for Auto-Wrap.', N'652' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 2, N'OP_CODE_MAPPING_CACHE_DATE', N'OpCode Mapping Cache Date', N'The last date the OpCode mapping was updated.',
      N'2016-05-05 10:35:45.398' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 3, N'GC_REQUEST_RESPONSE_MAPPING_DATE', N'GC Mapping Cache Date',
      N'The last date the GC Request/Response mapping was updated.', N'2016-06-21 16:05:48.736' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 5, N'I3_WRAP_UP_SEND_DELAY', N'I3 Wrap-Up Send Delay',
      N'The time, in milliseconds, that CCA will wait following the expiration of an auto-wrap timer before sending the Wrap-Up Code to I3.',
      N'5000' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 6, N'SLOW_RESPONSE_MESSAGE_DELAY', N'Slow Response Message Delay',
      N'The time, in milliseconds, that CCA will wait following a request to APLS before broadcasting a slow response message to the user.',
      N'10000' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 7, N'DEFAULT_LOCATION_HISTORY_DATE_RANGE', N'Default Location History Date Range',
      N'The number of days of transaction history that CCA will use for locations by default.', N'1' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 8, N'DEFAULT_MM_PRODUCT_HISTORY_DATE_RANGE', N'Default MM Product History Date Range',
      N'The number of days of transaction history that CCA will use for Merchant Manager products by default.', N'45' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 9, N'DEFAULT_GC_PRODUCT_HISTORY_DATE_RANGE', N'Default GC Product History Date Range',
      N'The number of days of transaction history that CCA will use for GreenCard products by default.', N'3650' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 11, N'TROUBLESHOOTING_SESSION_DURATION', N'Live Troubleshooting Session Duration',
      N'The time allowed before a live troubleshooting session is automatically disconnected, in minutes.', N'15' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 13, N'DEFAULT_CUSTOMER_HISTORY_DATE_RANGE', N'Default Customer History Date Range',
      N'The number of days of transaction history that CCA will use for customers by default.', N'365' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 14, N'JIRA_COLLECTOR_URL', N'JIRA Collector URL',
      N'The URL to be used with the JIRA feedback collector component.',
      N'http://jira.incomm.com/s/d41d8cd98f00b204e9800998ecf8427e/en_USkudr0e-1988229788/6158/21/1.4.1/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?collectorId=21b9ebd4' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 15, N'AD_ROLES_MASTER_LIST', N'AD Roles Master List',
      N'The list (comma separated), of Active Directory roles that CCA will attempt to map to CCA roles and automatically assign to new users.',
      N'NOR-MANAGER,NOR-SUPERVISOR,NOR-CSR,JAX-MANAGER,JAX-SUPERVISOR,JAX-CSR,SLCEngineering,FRAUD-MANAGER,FRAUD-SUPERVISOR,FRAUD-CSR,RBC-MANAGER,RBC-SUPERVISOR,RBC-CSR' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 16, N'DEFAULT_DROPPED_CALL_WRAP_UP_CODE_ID', N'Default Dropped Call Wrap-Up Code ID',
      N'The database ID of the Wrap-Up Code to be used for dropped calls (calls that disconnected within 5 seconds of connecting).',
      N'899' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value])
VALUES ( 17, N'APLS_TIMEOUT', N'APLS Timeout', N'APLS request timeout in ms', N'60000' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 18, N'NEW_USER_DEFAULT_ROLE_ID', N'New User Default Role ID',
      N'The default role all new users should be added to *IF* the user is automatically added to another role based on their AD security group(s).',
      N'35' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 19, N'DEFAULT_SEND_FORM_MAIL_DISTRIBUTION', N'Default Send Form Mail Distribution',
      N'The email address to which Minion should forward Send Form requests when the delivery method is Mail.',
      N'SLC-CS-DEV@incomm.com' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 20, N'DEFAULT_SEND_FORM_FAX_DISTRIBUTION', N'Default Send Form Fax Distribution',
      N'The email address to which Minion should forward Send Form requests when the delivery method is Fax.',
      N'SLC-CS-DEV@incomm.com' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 21, N'JIRA_TIMEOUT', N'JIRA Timeout',
      N'The maximum amount of time CCA will wait for JIRA to respond to requests.', N'60000' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 22, N'DEFAULT_SEND_DISPUTE_FORM_BCC_DISTRIBUTION', N'Default Send Dispute Form BCC Distribution',
      N'The BCC group for emails related to send dispute form requests', N'gprdisputes@incomm.com' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 24, N'DEFAULT_CASHTIE_HISTORY_DATE_RANGE', N'Default Cashtie History Date Range',
      N'The number of days of transaction history that CCA will use for Cashtie accounts by default.', N'3650' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 25, N'DEFAULT_SEND_FORM_MAIL_DISTRIBUTION_DISPUTES', N'Default Send Form Mail Distribution - Disputes',
      N'The email address to which Minion should forward Send Dispute Form requests when the delivery method is Mail.',
      N'gprdisputes@incomm.com' )
INSERT [dbo].[cca_property] ([id], [system_name], [display_name], [description], [value]) VALUES
    ( 26, N'DEFAULT_SEND_FORM_FAX_DISTRIBUTION_DISPUTES', N'Default Send Form Fax Distribution - Disputes',
      N'The email address to which Minion should forward Send Dispute Form requests when the delivery method is Fax.',
      N'gprdisputes@incomm.com' )
SET IDENTITY_INSERT [dbo].[cca_property] OFF
SET IDENTITY_INSERT [dbo].[cca_role] ON

INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 1, N'CANADA_TECH_OPS', N'Canada Tech Ops', NULL, 1, 0, 1, CAST ( N'2015-06-22T14:09:40.0000000' AS DATETIME2 ), 1,
         CAST ( N'2015-06-22T14:09:40.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 2, N'TERMINAL_SUPPORT', N'Terminal Support', NULL, 1, 0, 1, CAST ( N'2015-08-19T11:12:02.0000000' AS DATETIME2 ),
         1, CAST ( N'2015-08-19T11:12:02.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 3, N'KWIK', N'KWIK', NULL, 1, 0, 1, CAST ( N'2015-08-20T13:30:39.0000000' AS DATETIME2 ), 1,
            CAST ( N'2015-08-20T13:30:39.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4, N'JAX_CORR', N'JAX-CORR', NULL, 1, 0, 1, CAST ( N'2015-03-06T17:34:21.0000000' AS DATETIME2 ), 1,
            CAST ( N'2016-06-21T17:50:42.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 5, N'JAX_CSR', N'JAX-CSR', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:20:26.0000000' AS DATETIME2 ), 1,
            CAST ( N'2016-07-14T13:02:19.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 6, N'ALPH_OWENERSHIP_RSR', N'ALPH-OWNERSHIP-RSR', NULL, 1, 0, 1,
            CAST ( N'2015-08-25T11:15:22.0000000' AS DATETIME2 ), 1,
            CAST ( N'2016-04-05T14:23:54.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 7, N'JAX_MANAGER', N'JAX-MANAGER', NULL, 1, 0, 1, CAST ( N'2015-03-02T18:04:20.0000000' AS DATETIME2 ), 1,
            CAST ( N'2016-07-20T15:53:26.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 8, N'RBC_TECH_OPS_RSR', N'RBC-TECH_OPS-RSR', NULL, 1, 0, 1, CAST ( N'2015-08-19T16:56:10.0000000' AS DATETIME2 ),
         1, CAST ( N'2015-08-19T16:56:10.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 9, N'CORP_OPS_RSR', N'CORP-OPS-RSR', NULL, 1, 0, 1, CAST ( N'2015-10-15T17:45:05.0000000' AS DATETIME2 ), 1,
            CAST ( N'2015-10-15T17:45:05.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 10, N'RBC_OPERATIONS_SUPPORT', N'RBC - Operations Support', NULL, 1, 0, 1,
             CAST ( N'2015-12-17T13:32:56.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T17:28:59.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 11, N'JAX_SUPERVISOR', N'JAX-SUPERVISOR', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:19:53.0000000' AS DATETIME2 ), 1,
          CAST ( N'2016-07-21T12:06:10.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 12, N'RBC_MANAGER', N'RBC-MANAGER', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:22:25.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T17:33:55.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 13, N'NOR_CSR', N'NOR-MS-REP', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:21:53.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-12T13:41:14.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 14, N'FRAUD_MANAGER', N'FRAUD-MANAGER', NULL, 1, 0, 1, CAST ( N'2015-03-02T15:48:44.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T09:36:58.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 15, N'COL_BASE_USER', N'Base COL User', NULL, 1, 0, 1, CAST ( N'2016-01-08T14:07:47.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-28T08:36:36.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 16, N'PORT_OPERATIONS_RSR', N'PORT-OPERATIONS-RSR', NULL, 1, 0, 1,
             CAST ( N'2015-08-20T13:11:29.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-05-02T16:21:09.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 17, N'RBC_CSR', N'RBC-CSR', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:23:20.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-04-08T10:55:38.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 18, N'FRAUD_SUPERVISOR', N'FRAUD-SUPERVISOR', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:26:51.0000000' AS DATETIME2 ),
          1, CAST ( N'2016-07-13T09:37:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 19, N'COL_RECONCILATION', N'COL-RECON', NULL, 1, 0, 1, CAST ( N'2015-06-16T13:06:30.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-03-31T12:58:39.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 20, N'RBC_SUPERVISOR', N'RBC-SUPERVISOR', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:22:51.0000000' AS DATETIME2 ), 1,
          CAST ( N'2016-04-05T16:13:18.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 21, N'COL_COMPLIANCE_1', N'COL-COMPLIANCE', NULL, 1, 0, 1, CAST ( N'2015-10-07T15:58:56.0000000' AS DATETIME2 ),
          1, CAST ( N'2016-07-01T14:46:25.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 22, N'COL_ADMIN', N'COL-ADMIN', NULL, 1, 0, 1, CAST ( N'2015-06-16T13:07:36.0000000' AS DATETIME2 ), 1,
             CAST ( N'2015-06-16T13:07:36.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 23, N'COL_CREDIT', N'COL-CREDIT', NULL, 1, 0, 1, CAST ( N'2015-06-16T13:07:09.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-04-19T11:47:47.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 24, N'FRAUD_CSR', N'FRAUD-CSR', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:27:21.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-28T08:36:46.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 25, N'FINANCIAL_SERVICES_INTERNATIONAL', N'Financial Services (International)', NULL, 1, 0, 1,
             CAST ( N'2015-04-28T13:35:38.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T11:33:16.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 26, N'GREENCARD_DEV_TEAM', N'GreenCard Dev Team', NULL, 1, 0, 1,
             CAST ( N'2015-04-22T16:25:45.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-05-04T16:40:13.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 27, N'ATL_TRAINING', N'ATL-TRAINING', NULL, 1, 0, 1, CAST ( N'2015-08-19T13:33:13.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-01T11:06:36.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 28, N'BETA_GROUP', N'BETA GROUP', NULL, 1, 0, 1, CAST ( N'2015-05-21T22:47:20.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-07T18:42:46.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 29, N'PORT_OPERATIONS_2', N'PORT-OPERATIONS-2', NULL, 1, 0, 1,
             CAST ( N'2015-09-29T11:00:05.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-05-03T18:29:53.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 30, N'CORP_IT_DEV_RSR', N'CORP-IT_DEV-RSR', NULL, 1, 0, 1, CAST ( N'2015-10-14T14:25:09.0000000' AS DATETIME2 ),
          1, CAST ( N'2016-05-26T15:40:37.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 31, N'NOC_INCIDENT_MANAGEMENT_TEAM', N'NOC (Incident Management Team)', NULL, 1, 0, 1,
             CAST ( N'2015-05-07T11:52:55.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-06-14T16:40:12.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 32, N'NOR_MANAGER', N'NOR-MS-MGR', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:21:02.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-05-11T10:28:58.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 33, N'NOR_SUPERVISOR', N'NOR-MS-SUP', NULL, 1, 0, 1, CAST ( N'2015-03-02T17:21:27.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-12T13:41:10.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 34, N'COL_DISPUTES', N'COL-DISPUTES', NULL, 1, 0, 1, CAST ( N'2015-06-16T13:08:25.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-06-13T12:33:55.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 35, N'BASIC_CCA_USER', N'Basic CCA User', NULL, 1, 1, 1, CAST ( N'2015-10-19T15:46:08.0000000' AS DATETIME2 ), 1,
          CAST ( N'2016-08-01T09:23:16.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 36, N'ACCOUNT_MANAGERS', N'Account Managers', NULL, 1, 0, 1, CAST ( N'2016-01-05T11:09:17.0000000' AS DATETIME2 ),
          1, CAST ( N'2016-07-07T16:24:27.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 38, N'SYSTEM_ADMINISTRATION', N'System Administration', N'A role for system administrators.', 1, 1, 1,
             CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-26T13:44:57.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 39, N'CCA_OWNERSHIP', N'CCA-Ownership', NULL, 1, 0, 1, CAST ( N'2016-02-24T16:25:36.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-03-29T13:09:33.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 40, N'ACCOUNT_MANAGER_LVL_2', N'Account Managers Lvl 2', N'Account managers with permissions to adjust accounts',
          1, 0, 1, CAST ( N'2016-02-29T15:27:46.0000000' AS DATETIME2 ), 1,
          CAST ( N'2016-05-10T12:39:11.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 41, N'REPORTING_LVL_1', N'Reporting Lvl 1', N'General Report Access', 1, 0, 1,
             CAST ( N'2016-03-02T11:19:36.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-03-02T11:20:15.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 43, N'JAX_BETA_USERS', N'JAX-BETA Users', N'Beta Test Group for Jacksonville', 1, 0, 1,
             CAST ( N'2016-05-03T13:44:25.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-22T11:07:29.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 44, N'ACCOUNT_MANAGERS_LVL_3', N'Account Managers Lvl 3', N'lvl 3 perms for special program admin', 1, 0, 1,
             CAST ( N'2016-05-10T12:33:23.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-06-09T17:19:28.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 45, N'NOR_CS_REP', N'NOR-CS-REP', N'Customer Service Rep in NOR', 1, 0, 1,
             CAST ( N'2016-05-11T10:25:30.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-05-11T10:25:30.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 46, N'NOR_CS_SUP', N'NOR-CS-SUP', N'Customer Service Supervisor in NOR', 1, 0, 1,
             CAST ( N'2016-05-11T10:27:14.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-12T13:59:36.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 47, N'NOR_CS_MGR', N'NOR-CS-MGR', N'Customer Service Managers in Norcross', 1, 0, 1,
             CAST ( N'2016-05-11T10:27:50.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T13:01:17.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 48, N'JAX_BETA_CSR_USERS', N'JAX-BETA-CSR Users', NULL, 1, 0, 1,
             CAST ( N'2016-05-27T15:16:32.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-22T11:07:35.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 49, N'BASE_JAX_USER', N'Base JAX User', N'Basic Jacksonville user.', 1, 0, 1,
             CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-15T15:42:40.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 50, N'BASE_NOR_USER', N'NOR-MS-BASE', N'Basic permission for anyone in Norcross assigned to Merchant Service', 1,
          0, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
          CAST ( N'2016-07-13T13:05:39.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 51, N'BASE_RBC_USER', N'Base RBC User', N'Basic Richmond user.', 1, 0, 1,
             CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T09:37:44.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 52, N'NOR_CS_BASE', N'NOR-CS-BASE', N'Basic permission for anyone in Norcross assigned to Customer Service', 1, 0,
          1, CAST ( N'2016-07-13T13:04:01.0000000' AS DATETIME2 ), 1,
          CAST ( N'2016-07-13T13:04:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 56, N'CS_MANAGER', N'CS-MANAGER', N'Customer Services Managers', 1, 0, 1,
             CAST ( N'2016-07-13T14:07:18.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T15:17:27.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 57, N'CS_BASE', N'CS-BASE', N'Basic Permissions required by all Customer Service Roles', 1, 0, 1,
             CAST ( N'2016-07-13T14:39:09.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T15:11:16.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 58, N'CS_REPRESENTATIVE', N'CS-REPRESENTATIVE', NULL, 1, 0, 1,
             CAST ( N'2016-07-13T14:52:21.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T15:15:10.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 59, N'CS_SUPERVISOR', N'CS-SUPERVISOR', N'Permissions required by all Customer Service Supervisors', 1, 0, 1,
             CAST ( N'2016-07-13T14:53:12.0000000' AS DATETIME2 ), 1,
             CAST ( N'2016-07-13T15:18:55.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[cca_role] ([id], [system_name], [display_name], [description], [active], [locked], [group_id], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 61, N'RBC_BETA_USERS', N'RBC-BETA-Users', NULL, 1, 0, 1, CAST ( N'2016-07-27T16:55:48.0000000' AS DATETIME2 ), 1,
          CAST ( N'2016-07-27T17:02:19.0000000' AS DATETIME2 ), 1 )
SET IDENTITY_INSERT [dbo].[cca_role] OFF
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 1, 60 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 1, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 1, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 1, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 1, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 1, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 1, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 13 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 15 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 58 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 2, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 3, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 3, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 3, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 3, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 3, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 3, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 89 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 4, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 89 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 4449 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 5, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 6, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 6, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 6, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 6, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 6, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 6, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 6, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4143 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4298 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4302 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4309 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4312 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4316 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4322 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4323 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4324 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4325 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4335 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4336 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4338 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 7, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 8, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 8, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 8, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 13 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 15 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 9, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 4097 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 10, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 27 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4120 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4121 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4122 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4124 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4140 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4141 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4142 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4145 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4147 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4148 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4149 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4151 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4152 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4298 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4302 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4309 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4312 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4316 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4322 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4323 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4324 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4325 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4335 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4336 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4338 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4340 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4341 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4482 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 11, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 60 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 90 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 100 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4097 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4120 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4121 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4122 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4124 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4140 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4141 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4142 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4143 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4144 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4145 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4146 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4147 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4148 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4149 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4150 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4151 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4152 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4338 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4340 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4341 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4482 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 12, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 13, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 84 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 92 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 94 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 95 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 14, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 34 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 39 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 40 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 41 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 42 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 44 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 81 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 83 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 84 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 107 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 15, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 16, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 16, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 16, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 16, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 16, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 16, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 16, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 60 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 89 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 17, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 18, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 13 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 15 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 93 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 94 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 95 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 19, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 45 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 60 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 90 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 20, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 21, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 21, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 21, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 21, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 21, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 22, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 22, 93 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 22, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 22, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 23, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 23, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 23, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 23, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 23, 93 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 23, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 23, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 24, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 24, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 24, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 24, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 24, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 24, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 24, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 34 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 39 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 42 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 81 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 93 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 95 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 4109 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 25, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 34 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 39 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 40 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 41 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 42 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 44 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 45 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 81 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 26, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 13 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 15 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 34 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 44 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 59 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 81 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 83 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 84 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 93 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 95 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 27, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 84 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4097 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4120 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4121 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4124 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4140 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4141 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4142 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4143 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4144 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4145 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4146 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4147 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4148 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4149 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4151 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4298 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4299 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4300 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4301 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4302 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4303 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4304 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4305 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4306 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4307 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4309 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4310 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4311 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4312 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4314 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4315 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4316 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4317 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4318 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4319 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4320 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4322 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4323 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4324 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4325 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4327 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4328 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4329 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4330 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4331 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4332 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4333 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4335 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4336 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4338 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4339 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4340 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4341 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 28, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 34 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 44 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 81 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 83 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 89 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 4106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 29, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 30, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 31, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 55 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 58 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 32, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 58 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 33, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 34, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 34, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 34, 92 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 34, 94 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 34, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 34, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 35, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 13 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 15 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 36, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 13 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 15 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 34 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 39 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 40 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 41 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 42 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 44 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 45 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 58 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 59 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 60 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 61 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 62 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 63 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 64 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 65 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 66 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 67 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 68 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 69 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 70 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 71 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 72 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 73 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 74 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 75 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 76 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 77 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 78 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 79 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 81 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 82 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 83 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 84 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 89 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 90 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 92 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 93 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 94 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 95 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 97 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 107 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4096 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4097 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4098 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4107 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4108 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4109 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4110 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4111 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4112 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4113 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4114 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4342 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4490 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 38, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 13 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 14 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 15 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 16 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 20 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 29 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 34 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 39 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 40 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 41 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 42 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 44 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 58 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 59 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 61 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 62 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 63 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 64 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 65 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 66 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 67 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 68 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 69 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 70 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 71 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 72 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 73 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 74 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 75 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 76 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 77 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 78 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 79 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 81 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 82 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 83 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 84 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 88 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 89 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 90 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 92 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 93 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 95 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 107 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4096 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4097 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4098 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4107 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4108 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4109 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4110 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4111 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4112 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4113 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4114 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4115 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 39, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 40, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 40, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 40, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 40, 90 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 40, 4108 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 40, 4449 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 40, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 41, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 41, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4097 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4116 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4118 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4120 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4121 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4124 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4140 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4141 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4142 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4143 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4144 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4145 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4146 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4147 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4148 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4149 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4150 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4151 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4152 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4298 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4299 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4300 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4301 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4302 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4303 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4304 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4305 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4306 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4307 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4309 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4310 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4311 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4312 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4314 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4315 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4316 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4317 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4318 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4319 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4320 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4322 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4323 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4324 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4325 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4327 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4328 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4329 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4330 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4331 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4332 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4333 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4335 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4336 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4338 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4339 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4340 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4341 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4490 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 43, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 33 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4107 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4108 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4109 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4110 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4111 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4112 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4113 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4114 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 44, 4524 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 45, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 45, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 46, 58 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 46, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 46, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 4118 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 47, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4116 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4120 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4124 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4140 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4141 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4142 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4144 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4145 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4146 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4147 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4148 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4149 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4150 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4151 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4152 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4298 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4299 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4300 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4301 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4302 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4303 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4304 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4305 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4306 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4307 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4309 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4310 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4311 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4312 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4314 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4315 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4316 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4317 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4318 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4319 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4320 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4322 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4323 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4324 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4325 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4327 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4328 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4329 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4330 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4331 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4332 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4333 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4335 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4336 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4338 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4340 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4341 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4490 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 48, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4300 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4301 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4303 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4304 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4307 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4310 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4311 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4312 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4314 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4315 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4317 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4319 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4320 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4343 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4344 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4345 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4346 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4347 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4348 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4349 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4350 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4351 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4352 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4353 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4354 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4355 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4356 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4357 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4358 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4359 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4360 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4361 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4362 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4404 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4405 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4435 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4436 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4437 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4438 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4439 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4440 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4441 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4446 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4450 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4465 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4466 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4472 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4473 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4474 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4475 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4476 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4477 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4478 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 49, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4363 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4364 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4365 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4366 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4367 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4368 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4369 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4370 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4371 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4372 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4373 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4374 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4375 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4376 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4377 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4378 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4379 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4380 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4381 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4382 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4383 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4384 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4385 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4386 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4387 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4388 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4389 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4390 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4391 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4392 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4393 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4394 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4395 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4396 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4397 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4398 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4399 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4400 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4407 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4408 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4409 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4410 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4411 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 50, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4403 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4406 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4447 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4448 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4467 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4468 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4469 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4470 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4471 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 51, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 52, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 18 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 19 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 21 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 22 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 23 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 26 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 30 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 35 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 80 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 85 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4143 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4298 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4302 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4309 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4316 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4322 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4323 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4324 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4325 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4335 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4336 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4338 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 56, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 24 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 25 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 27 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 28 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 29 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 31 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 32 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 36 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 37 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 38 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 43 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 45 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 46 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 47 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 48 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 51 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 52 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 57 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 98 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 99 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 101 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 105 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 106 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4300 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4301 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4303 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4304 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4307 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4310 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4311 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4312 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4314 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4315 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4317 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4319 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4320 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4343 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4344 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4345 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4346 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4347 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4348 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4349 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4350 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4351 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4352 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4353 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4354 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4355 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4356 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4357 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4358 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4359 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4360 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4361 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4362 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4404 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4405 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4435 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4436 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4437 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4438 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4439 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4440 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4441 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4446 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4449 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4450 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4465 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4466 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4472 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4473 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4474 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4475 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4476 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4477 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4478 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4487 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 57, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 58, 89 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 58, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 17 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 49 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 50 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 53 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 54 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 55 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 56 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 91 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 96 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4103 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4121 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4298 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4302 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4309 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4316 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4322 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4323 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4324 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4325 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4335 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4336 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 59, 4524 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 104 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4099 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4100 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4102 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4120 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4121 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4122 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4123 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4124 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4140 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4141 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4142 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4143 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4144 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4145 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4146 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4147 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4148 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4149 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4150 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4151 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4152 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4300 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4301 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4302 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4303 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4304 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4305 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4306 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4338 )
GO
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4339 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4340 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4341 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4482 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4489 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4490 )
INSERT [dbo].[cca_role_permission] ([role_id], [permission_id]) VALUES ( 61, 4524 )
SET IDENTITY_INSERT [dbo].[cca_user] ON

INSERT [dbo].[cca_user] ([id], [username], [first_name], [last_name], [email], [active], [pref_show_billable_only], [pref_default_data_source], [created_date], [created_by], [modified_date], [modified_by], [default_partner_id], [company], [department], [employee_id], [title], [display_name], [mobile], [phone], [pref_session_mode], [pref_dock_mode], [pref_default_search_type], [pref_summary_mode], [pref_default_session_type], [pref_dont_show_whats_new], [last_login_date])
VALUES
    ( 1, N'cca_admin', N'CCA_Admin', NULL, NULL, 1, 0, N'INCOMM', CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:35:16.3120000' AS DATETIME2 ), 1, 4, NULL, NULL, NULL, N'Resource Account',
                                                                  N'CCA_Admin', NULL, NULL, N'CARD', N'UNPINNED',
      N'FASTCARD', N'LEFT', N'GENERAL', 1, CAST ( N'2017-12-08T14:35:12.4250000' AS DATETIME2 ) )
INSERT [dbo].[cca_user] ([id], [username], [first_name], [last_name], [email], [active], [pref_show_billable_only], [pref_default_data_source], [created_date], [created_by], [modified_date], [modified_by], [default_partner_id], [company], [department], [employee_id], [title], [display_name], [mobile], [phone], [pref_session_mode], [pref_dock_mode], [pref_default_search_type], [pref_summary_mode], [pref_default_session_type], [pref_dont_show_whats_new], [last_login_date])
VALUES ( 2, N'system_default_user', NULL, NULL, NULL, 0, 0, N'INCOMM',
            CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1,
            CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
                                                                  N'CARD', N'UNPINNED', N'FASTCARD', N'LEFT',
         N'GENERAL', 0, NULL )
INSERT [dbo].[cca_user] ([id], [username], [first_name], [last_name], [email], [active], [pref_show_billable_only], [pref_default_data_source], [created_date], [created_by], [modified_date], [modified_by], [default_partner_id], [company], [department], [employee_id], [title], [display_name], [mobile], [phone], [pref_session_mode], [pref_dock_mode], [pref_default_search_type], [pref_summary_mode], [pref_default_session_type], [pref_dont_show_whats_new], [last_login_date])
VALUES ( 3, N'asudweeks', N'Allen', N'Sudweeks', N'asudweeks@incomm.com', 1, 0, N'INCOMM',
            CAST ( N'2017-12-08T14:36:31.8790000' AS DATETIME2 ), 1,
            CAST ( N'2017-12-08T14:45:51.2130000' AS DATETIME2 ), 3, 4, N'InComm', N'Information Technology',
                                                                  N'105187 ', N'Senior Software Engineer',
                                                                  N'Allen Sudweeks', NULL, NULL, N'CARD', N'UNPINNED',
         N'FASTCARD', N'LEFT', N'GENERAL', 1, CAST ( N'2017-12-08T14:41:19.6860000' AS DATETIME2 ) )
SET IDENTITY_INSERT [dbo].[cca_user] OFF
SET IDENTITY_INSERT [dbo].[disputed_card_tag] ON

INSERT [dbo].[disputed_card_tag] ([id], [name]) VALUES ( 1, N'Active' )
INSERT [dbo].[disputed_card_tag] ([id], [name]) VALUES ( 2, N'Consumed' )
SET IDENTITY_INSERT [dbo].[disputed_card_tag] OFF
SET IDENTITY_INSERT [dbo].[gc_request] ON

INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 1, N'400', N'180100', N'Reversal', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 2, N'_200', N'_300100', N'Inquiry', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 3, N'9220', N'_250001', N'Forced Return', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 4, N'_200', N'_250001', N'Return', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 5, N'9220', N'_360100', N'Payment Reversal', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 6, N'9220', N'100100', N'Forced Withdrawal', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 7, N'9220', N'_180100', N'Forced Cashback', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 8, N'200', N'100100', N'Withdrawal', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 9, N'_200', N'_180100', N'Cashback', N'CREDIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 10, N'9220', N'_160100', N'Balance Provided', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 11, N'200', N'150100', N'Purchase', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 12, N'9220', N'150100', N'Reversal', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 13, N'200', N'_360100', N'PreAuth Request', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 14, N'CRED', N'990400', N'First Use', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 15, N'CRED', N'970200', N'Purchase', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 16, N'DEBT', N'990100', N'Fee', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 17, N'ACT', N'2001', N'Activation', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 18, N'CRED', N'990800', N'Fee Reversal', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 19, N'FRD', N'4001', N'Fraud', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 20, N'200', N'150200', N'Preauth', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 21, N'9220', N'150200', N'Reversal', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 22, N'9220', N'250002', N'Merchandise Return', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 23, N'9220', N'250003', N'Merchant Return Reversal', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 24, N'CRED', N'4025', N'Credit', N'OTHER' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 25, N'DEBT', N'4500', N'Debit', N'DEBIT' )
INSERT [dbo].[gc_request] ([id], [x95_code], [request_code], [request_value], [transaction_type])
VALUES ( 26, N'DEAC', N'2002', N'Deactivation', N'OTHER' )
SET IDENTITY_INSERT [dbo].[gc_request] OFF
SET IDENTITY_INSERT [dbo].[gc_response] ON

INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 1, N'591_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 2, N'589_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 3, N'559_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 4, N'568_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 5, N'570_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 6, N'554_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 7, N'588_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 8, N'549_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 9, N'580_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 10, N'551_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 11, N'584_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 12, N'557_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 13, N'560_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 14, N'544_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 15, N'565_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 16, N'562_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 17, N'599_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 18, N'561_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 19, N'574_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 20, N'593_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 21, N'543_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 22, N'558_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 23, N'567_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 24, N'575_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 25, N'504_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 26, N'509_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 27, N'581_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 28, N'501_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 29, N'563_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 30, N'577_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 31, N'590_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 32, N'583_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 33, N'550_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 34, N'582_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 35, N'569_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 36, N'578_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 37, N'502_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 38, N'505_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 39, N'500_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 40, N'555_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 41, N'556_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 42, N'585_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 43, N'545_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 44, N'572_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 45, N'530_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 46, N'553_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 47, N'571_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 48, N'579_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 49, N'576_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 50, N'000', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 51, N'552_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 52, N'592_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 53, N'566_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 54, N'546_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 55, N'564_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 56, N'587_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 57, N'573_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 58, N'503_', N'Approved' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 59, N'586_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 60, N'481', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 61, N'594_', N'Denied' )
INSERT [dbo].[gc_response] ([id], [response_code], [response_value]) VALUES ( 62, N'999_', N'Other' )
SET IDENTITY_INSERT [dbo].[gc_response] OFF
SET IDENTITY_INSERT [dbo].[op_code] ON

INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 1, N'-1', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 2, N'2001', N'Activate', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 3, N'2002', N'Deactivate', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 4, N'2003', N'Reload', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 5, N'2004', N'Other', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 6, N'2005', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 7, N'2006', N'Other', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 8, N'2007', N'Credit', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 9, N'2008', N'Reload', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 10, N'2009', N'Reversal', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 11, N'2010', N'Reload', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 12, N'2011', N'Redeem', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 13, N'2012', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 14, N'2013', N'Redeem', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 15, N'2014', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 16, N'2015', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 17, N'2016', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 18, N'2017', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 19, N'2018', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 20, N'2019', N'Activate', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 21, N'2020', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 22, N'2021', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 23, N'2022', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 24, N'2023', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 25, N'2024', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 26, N'2025', N'Deactivate', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 27, N'2026', N'Reload', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 28, N'2027', N'Balance', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 29, N'2028', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 30, N'2029', N'Fee', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 31, N'2030', N'Credit', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 32, N'2031', N'Other', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 33, N'2032', N'Other', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 34, N'2033', N'Revoke', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 35, N'2034', N'Credit', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 36, N'2035', N'Credit', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 37, N'2036', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 38, N'2037', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 39, N'2038', N'Activate', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 40, N'2039', N'Deactivate', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 41, N'2051', N'Activate', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 42, N'2052', N'Deactivate', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 43, N'2053', N'Redeem', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 44, N'2054', N'Reload', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 45, N'2060', N'Expire', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 46, N'2100', N'Reload', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 47, N'2101', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 48, N'2200', N'FastPIN', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 49, N'2201', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 50, N'2202', N'FastPIN', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 51, N'2203', N'Wholesale', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 52, N'2204', N'Return', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 53, N'2205', N'Reversal', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 54, N'2206', N'Reversal', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 55, N'2230', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 56, N'3001', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 57, N'3007', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 58, N'3010', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 59, N'3011', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 60, N'3012', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 61, N'3013', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 62, N'3014', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 63, N'3015', N'Verifone', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 64, N'3016', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 65, N'3031', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 66, N'3032', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 67, N'3033', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 68, N'3103', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 69, N'3104', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 70, N'4000', N'No DCMS action', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 71, N'4001', N'RealTime', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 72, N'4002', N'Activate', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 73, N'4003', N'Deactivate', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 74, N'4004', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 75, N'4005', N'PreReload', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 76, N'4006', N'Verifone', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 77, N'4007', N'PostReload', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 78, N'4009', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 79, N'4010', N'Terminal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 80, N'4011', N'Activate', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 81, N'4012', N'Deactivate', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 82, N'4013', N'FastPin', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 83, N'4014', N'Return', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 84, N'4015', N'Activate', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 85, N'4016', N'Deactivate', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 86, N'4017', N'Value Insertion', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 87, N'4018', N'Return', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 88, N'4019', N'Status', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 89, N'4020', N'Balance', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 90, N'4021', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 91, N'4022', N'Redeem', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 92, N'4023', N'Credit', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 93, N'4024', N'Debit', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 94, N'4025', N'Credit', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 95, N'4026', N'Debit', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 96, N'4027', N'Reload', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 97, N'4030', N'Status', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 98, N'4040', N'Redeem', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 99, N'4041', N'Reversal', N'Other', N'CREDIT' )
GO
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 100, N'4042', N'Reload', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 101, N'4043', N'Reversal', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 102, N'4044', N'Credit', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 103, N'4045', N'Balance', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 104, N'4051', N'Activate', N'Failure', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 105, N'4052', N'Deactivate', N'Failure', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 106, N'4053', N'Redeem', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 107, N'4054', N'Reload', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 108, N'4055', N'Balance', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 109, N'4056', N'Redeem', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 110, N'4057', N'Credit', N'Failure', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 111, N'4058', N'Reload', N'Failure', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 112, N'4059', N'Reload', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 113, N'4060', N'Redeem', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 114, N'4061', N'Status', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 115, N'4062', N'Credit', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 116, N'4063', N'Reversal', N'Success', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 117, N'4064', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 118, N'4065', N'Reversal', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 119, N'4070', N'Terminal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 120, N'4071', N'Terminal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 121, N'4072', N'Credit', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 122, N'4073', N'Credit', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 123, N'4074', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 124, N'4075', N'Reversal', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 125, N'4076', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 126, N'4077', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 127, N'4078', N'Credit', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 128, N'4081', N'Reversal', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 129, N'4084', N'Lock', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 130, N'4087', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 131, N'4090', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 132, N'4091', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 133, N'4092', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 134, N'4093', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 135, N'4094', N'Unlock', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 136, N'4095', N'History', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 137, N'4096', N'History', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 138, N'4097', N'History', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 139, N'4098', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 140, N'4099', N'Unlock', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 141, N'4100', N'Web', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 142, N'4101', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 143, N'4102', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 144, N'4110', N'Transfer', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 145, N'4111', N'Transfer', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 146, N'4112', N'Transfer', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 147, N'4116', N'Transfer', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 148, N'4117', N'Transfer', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 149, N'4118', N'Transfer', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 150, N'4119', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 151, N'4120', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 152, N'4121', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 153, N'4122', N'Reload', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 154, N'4123', N'Reload', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 155, N'4124', N'Reload', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 156, N'4125', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 157, N'4126', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 158, N'4127', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 159, N'4128', N'Other', N'Other', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 160, N'4129', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 161, N'4130', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 162, N'4131', N'Other', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 163, N'4132', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 164, N'4133', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 165, N'4134', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 166, N'4135', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 167, N'4136', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 168, N'4137', N'Other', N'Other', N'DEBIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 169, N'4138', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 170, N'4139', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 171, N'4140', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 172, N'4141', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 173, N'4142', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 174, N'4143', N'Revoke', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 175, N'4146', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 176, N'4147', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 177, N'4148', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 178, N'4149', N'Unload', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 179, N'4150', N'Unload', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 180, N'4151', N'Unload', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 181, N'4152', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 182, N'4153', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 183, N'4154', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 184, N'4200', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 185, N'4201', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 186, N'4204', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 187, N'4300', N'PreAuth', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 188, N'4301', N'PreAuth', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 189, N'4302', N'PreAuth', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 190, N'4303', N'PreAuth', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 191, N'4304', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 192, N'4305', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 193, N'4306', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 194, N'4307', N'PreAuth', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 195, N'4308', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 196, N'4309', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 197, N'4310', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 198, N'4311', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 199, N'4312', N'Reversal', N'Other', N'OTHER' )
GO
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 200, N'4313', N'PreAuth', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 201, N'4314', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 202, N'4315', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 203, N'4316', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 204, N'4317', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 205, N'4318', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 206, N'4319', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 207, N'4320', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 208, N'4321', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 209, N'4322', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 210, N'4324', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 211, N'4325', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 212, N'4326', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 213, N'4327', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 214, N'4328', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 215, N'4329', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 216, N'4330', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 217, N'4331', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 218, N'4332', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 219, N'4333', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 220, N'4334', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 221, N'4350', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 222, N'4351', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 223, N'4352', N'Status Update', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 224, N'4353', N'Status Update', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 225, N'4354', N'Status Update', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 226, N'4355', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 227, N'4356', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 228, N'4357', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 229, N'4400', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 230, N'4401', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 231, N'4402', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 232, N'4403', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 233, N'4404', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 234, N'4405', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 235, N'4406', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 236, N'4407', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 237, N'4408', N'Reversal', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 238, N'4500', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 239, N'4501', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 240, N'4502', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 241, N'4503', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 242, N'4505', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 243, N'5000', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 244, N'5001', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 245, N'5101', N'Activate', N'Success', N'CREDIT' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 246, N'5102', N'Deactivate', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 247, N'5103', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 248, N'5104', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 249, N'5105', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 250, N'5106', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 251, N'5107', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 252, N'5108', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 253, N'5109', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 254, N'5110', N'PreAuth', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 255, N'5111', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 256, N'5201', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 257, N'5202', N'PreAuth', N'Failure', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 258, N'5311', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 259, N'5312', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 260, N'5351', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 261, N'5352', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 262, N'5604', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 263, N'5605', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 264, N'5641', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 265, N'5644', N'Reversal', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 266, N'6000', N'History', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 267, N'6001', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 268, N'6007', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 269, N'6008', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 270, N'6009', N'Redeem', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 271, N'6010', N'Reversal', N'Success', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 272, N'6011', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 273, N'6012', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 274, N'6701', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 275, N'6702', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 276, N'6703', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 277, N'6704', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 278, N'6705', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 279, N'6706', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 280, N'6707', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 281, N'6708', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 282, N'6709', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 283, N'6710', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 284, N'6711', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 285, N'6712', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 286, N'6713', N'Deactivate', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 287, N'6714', N'Other', N'Other', N'OTHER' )
INSERT [dbo].[op_code] ([id], [code], [request_value], [response_value], [transaction_type])
VALUES ( 288, N'6715', N'Other', N'Other', N'OTHER' )
SET IDENTITY_INSERT [dbo].[op_code] OFF
SET IDENTITY_INSERT [dbo].[partner] ON

INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 1, N'Coinbase', N'0', 4096 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 2, N'DFC', N'0', 4097 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 3, N'EPP', N'0', 4098 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 4, N'InComm', N'8558411203', 4099 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 5, N'Jackson Hewitt', N'8555984818', 4100 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 6, N'Lyfe', N'0', 4101 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 7, N'NextCALA', N'0', 4102 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 8, N'PayPal', N'0', 4103 )
INSERT [dbo].[partner] ([id], [name], [ivr_dnis], [permission_id]) VALUES ( 9, N'YBSpot', N'0', 4104 )
SET IDENTITY_INSERT [dbo].[partner] OFF
SET IDENTITY_INSERT [dbo].[permission] ON

INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 13, N'SEARCH_BOOST', N'Status Search - Boost', N'Perform a Status lookup for Boost products', 28, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 14, N'SEARCH_VIRGIN', N'Status Search - Virgin', N'Perform a Status lookup for Virgin products', 28, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 15, N'SEARCH_NET10', N'Status Search - Net10', N'Perform a Status lookup for Net10 products', 28, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 16, N'SEARCH_TRACFONE', N'Status Search - TracFone', N'Perform a Status lookup for TracFone products', 28, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 17, N'UNMASK_PAN', N'Unmask PAN', NULL, 19, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 18, N'VIEW_UNMASKED_LOCATION_HISTORY', N'View Unmasked Location History', NULL, 19, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 19, N'GC_ADJUST_BALANCE_UP_TO_100', N'Adjust Balance up to $100.00', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 20, N'GC_ADJUST_BALANCE_UP_TO_500', N'Adjust Balance up to $500.00', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 21, N'GC_ADJUST_BALANCE_WHEN_ACTIVE', N'Adjust Balance when Active Status', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 22, N'GC_ADJUST_BALANCE_WHEN_DEACTIVE', N'Adjust Balance when Deactive Status', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 23, N'GC_ADJUST_BALANCE_WHEN_EXPIRED', N'Adjust Balance when Expired Status', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 24, N'GC_CHANGE_STATUS_INITIAL_TO_FRAUD', N'From Initial to Fraud Watch', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 25, N'GC_CHANGE_STATUS_INITIAL_TO_ON_HOLD', N'From Initial to On Hold', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 26, N'GC_CHANGE_STATUS_ACTIVE_TO_FRAUD', N'From Active to Fraud Watch', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 27, N'GC_CHANGE_STATUS_ACTIVE_TO_ON_HOLD', N'From Active to On Hold', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 28, N'GC_CHANGE_STATUS_ACTIVE_TO_LOST', N'From Active to Lost', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 29, N'GC_CHANGE_STATUS_ACTIVE_TO_STOLEN', N'From Active to Stolen', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 30, N'GC_CHANGE_STATUS_ON_HOLD_TO_FRAUD', N'From On Hold to Fraud Watch', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 31, N'GC_CHANGE_STATUS_ON_HOLD_TO_ACTIVE', N'From On Hold to Active', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 32, N'GC_CHANGE_STATUS_ON_HOLD_TO_LOST', N'From On Hold to Lost', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 33, N'GC_CHANGE_STATUS_ON_HOLD_TO_STOLEN', N'From On Hold to Stolen', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 34, N'GC_CHANGE_STATUS_STOLEN_TO_FRAUD', N'From Stolen to Fraud Watch', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 35, N'GC_CHANGE_STATUS_LOST_TO_FRAUD', N'From Lost to Fraud Watch', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 36, N'GC_CHANGE_STATUS_LOST_TO_ACTIVE', N'From Lost to Active', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 37, N'GC_CHANGE_STATUS_LOST_TO_ON_HOLD', N'From Lost to On Hold', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 38, N'GC_CHANGE_STATUS_LOST_TO_STOLEN', N'From Lost to Stolen', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 39, N'GC_CHANGE_STATUS_FRAUD_TO_ACTIVE', N'From Fraud Watch to Active', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 40, N'GC_CHANGE_STATUS_FRAUD_TO_ON_HOLD', N'From Fraud Watch to On Hold', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 41, N'GC_CHANGE_STATUS_FRAUD_TO_LOST', N'From Fraud Watch to Lost', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 42, N'GC_CHANGE_STATUS_FRAUD_TO_STOLEN', N'From Fraud Watch to Stolen', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 43, N'GC_CHANGE_STATUS_DEACTIVE_TO_ACTIVE', N'From Deactive to Active', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 44, N'GC_CHANGE_STATUS_BAD_CREDIT_TO_FRAUD', N'From Bad Credit to Fraud Watch', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 45, N'GC_CHANGE_STATUS_BAD_CREDIT_TO_ACTIVE', N'From Bad Credit to Active', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 46, N'GC_CHANGE_STATUS_BAD_CREDIT_TO_ON_HOLD', N'From Bad Credit to On Hold', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 47, N'GC_CHANGE_STATUS_BAD_CREDIT_TO_LOST', N'From Bad Credit to Lost', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 48, N'GC_CHANGE_STATUS_BAD_CREDIT_TO_STOLEN', N'From Bad Credit to Stolen', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 49, N'GC_REPLACE_CARD', N'Replace Card', NULL, 19, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 50, N'GC_RELEASE_PREAUTH', N'Release PreAuth', NULL, 19, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 51, N'GC_ACTIVATE_GIFT_CARD_REPLACEMENT', N'Activate Gift Card Replacement', NULL, 19, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 52, N'GC_ACTIVATE_B2B_CARD', N'Activate B2B Card', NULL, 19, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 53, N'EXPORT_PDF', N'Export to PDF', NULL, 16, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 54, N'EXPORT_CSV', N'Export to CSV', NULL, 16, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 55, N'EXPORT_XLSX', N'Export to XLSX', NULL, 16, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 56, N'CHALLENGE_PASSWORD', N'Challenge Password', NULL, 15, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 57, N'ADD_CALL_DETAILS', N'Add Call Details Plugin', NULL, 11, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-05T14:33:05.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 58, N'USE_NOR_QUEUES', N'Use NOR Queues', NULL, 5, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 59, N'USE_JAX_QUEUES', N'Use JAX Queues', NULL, 12, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 60, N'USE_RBC_QUEUES', N'Use RBC Queues', NULL, 10, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 61, N'ADMIN_TOGGLZ_PAGE', N'Admin Togglz Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 62, N'VIEW_APP_PROPERTIES', N'View Application Properties Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 63, N'ADMIN_APP_PROPERTIES', N'Admin Application Properties Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 64, N'VIEW_GC_REQUEST_MAPPINGS', N'View Greencard Request Mappings Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 65, N'ADMIN_GC_REQUEST_MAPPINGS', N'Admin Greencard Request Mappings Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 66, N'VIEW_GC_RESPONSE_MAPPINGS', N'View Greencard Response Mappings Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 67, N'ADMIN_GC_RESPONSE_MAPPINGS', N'Admin Greencard Response Mappings Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 68, N'VIEW_OP_CODE_MAPPINGS', N'View Op Code Mappings Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 69, N'ADMIN_OP_CODE_MAPPINGS', N'Admin Op Code Mappings Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 70, N'VIEW_QUEUES', N'View Queues Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 71, N'ADMIN_QUEUES', N'Admin Queues Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 72, N'VIEW_CATEGORIES', N'View Wrap_Up Categories Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 73, N'ADMIN_CATEGORIES', N'Admin Wrap_Up Categories Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 74, N'VIEW_CODES', N'View Wrap_Up Codes Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 75, N'ADMIN_CODES', N'Admin Wrap_Up Codes Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 76, N'VIEW_ROLES', N'View Roles Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 77, N'CREATE_ROLE', N'Create Role', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 78, N'VIEW_USERS', N'View Users Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 79, N'ADMIN_USERS', N'Admin Users Page', NULL, 4, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 80, N'GC_ADJUST_BALANCE_WHEN_INITIAL', N'Adjust Balance when Initial Status', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 81, N'GC_CHANGE_STATUS_DEACTIVE_TO_FRAUD', N'From Deactive to Fraud Watch', NULL, 21, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 82, N'EDIT_APP_PROPERTIES', N'Edit Application Properties Page', NULL, 4, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 83, N'ACTIVATE_FAST_CARD', N'Activate Fast Card', NULL, 13, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 84, N'DEACTIVATE_FAST_CARD', N'Deactivate Fast Card', NULL, 13, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 85, N'UNMASK_PIN', N'PayPal Unmask PIN', NULL, 6, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 88, N'OVERRIDE_BILLABLE', N'Override for billable on Fast Card Deactivate', NULL, 13, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 89, N'ADJUST_BALANCE_LEVEL_1', N'Adjust balance limit level 1', NULL, 17, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 90, N'ADJUST_BALANCE_LEVEL_2', N'Adjust balance limit level 2', NULL, 17, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 91, N'ADJUST_BALANCE_LEVEL_3', N'Adjust balance limit level 3', NULL, 17, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 92, N'ADJUST_BALANCE_LEVEL_4', N'Adjust balance limit level 4', NULL, 17, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 93, N'ADJUST_BALANCE_LEVEL_5', N'Adjust balance limit level 5', NULL, 17, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 94, N'ALLOW_CARD_BALANCE_TO_BE_NEGATIVE', N'Allow Card Balance to Be Negative', NULL, 14, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 95, N'GC_CARD_TRANSFER', N'Card Transfer', NULL, 19, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 96, N'GC_MERCHANDISE_RELEASE', N'Merchandise release', NULL, 7, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 97, N'ADMINISTER_BALANCE_ADJUSTMENT_LIMITS', N'Administer Balance Adjustment Limits', NULL, 9, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 98, N'SEARCH_BY_INCOMM', N'FastCard/PIN Search', NULL, 2, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 99, N'SEARCH_BY_PROMOTIONS', N'Promotions Search', NULL, 2, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 100, N'SEARCH_BY_FINANCIAL_GIFT', N'Financial Gift Search', NULL, 2, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 101, N'SEARCH_BY_VRN', N'VRN/Swipe Reload Search', NULL, 2, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 102, N'SEARCH_BY_PAYPAL', N'PayPal Search', NULL, 2, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 103, N'SEARCH_BY_LOCATION', N'Location Search', NULL, 2, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 104, N'SEARCH_BY_GPR', N'GPR Search', N'VMS Search', 2, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-24T16:32:39.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 105, N'SEARCH_BY_DDP', N'DDP Search', NULL, 2, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 106, N'HISTORY_FULL_VIEW', N'Green Card Full View', NULL, 18, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 107, N'CARD_STATUS_CHANGE_OVERRIDE', N'Card Status Change Override',
         N'Greencard: Overrides all status change limitations allowing for a status change no matter what the current status is',
         19, 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4096, N'PARTNER_PERMISSION4096', N'GPR Partner Coinbase Permission', NULL, 3, 0,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-17T13:36:36.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4097, N'PARTNER_PERMISSION4097', N'GPR Partner DFC Permission', NULL, 3, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-24T11:23:48.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4098, N'PARTNER_PERMISSION4098', N'GPR Partner EPP Permission', NULL, 3, 0,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-17T17:23:08.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4099, N'PARTNER_PERMISSION4099', N'GPR Partner InComm Permission', NULL, 3, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-03-04T12:42:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4100, N'PARTNER_PERMISSION4100', N'GPR Partner Jackson Hewitt Permission', NULL, 3, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-03-04T12:40:36.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4101, N'PARTNER_PERMISSION_LYFE', N'Partner Lyfe permission', NULL, 3, 0,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-17T13:37:16.0000000' AS DATETIME2 ),
         1 )
GO
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4102, N'PARTNER_PERMISSION4102', N'GPR Partner NextCALA Permission', NULL, 3, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-20T16:02:45.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4103, N'PARTNER_PERMISSION4103', N'GPR Partner PayPal Permission', NULL, 3, 0,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-17T13:36:48.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4104, N'PARTNER_PERMISSION4104', N'GPR Partner YBSpot Permission', NULL, 3, 0,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-17T13:36:57.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4105, N'LIVE_TROUBLESHOOTING', N'Live Troubleshooting', NULL, 8, 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4106, N'GC_CHANGE_STATUS_INITIAL_TO_ACTIVE', N'From Initial to Active', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4107, N'GC_CHANGE_STATUS_INITIAL_TO_STOLEN', N'From Initial to Stolen', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4108, N'GC_CHANGE_STATUS_INITIAL_TO_LOST', N'From Initial to Lost', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4109, N'GC_CHANGE_STATUS_STOLEN_TO_ACTIVE', N'From Stolen to Active', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4110, N'GC_CHANGE_STATUS_STOLEN_TO_ON_HOLD', N'From Stolen to On Hold', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4111, N'GC_CHANGE_STATUS_STOLEN_TO_LOST', N'From Stolen to Lost', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4112, N'GC_CHANGE_STATUS_DEACTIVE_TO_STOLEN', N'From Deactive to Stolen', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4113, N'GC_CHANGE_STATUS_DEACTIVE_TO_ON_HOLD', N'From Deactive to On Hold', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4114, N'GC_CHANGE_STATUS_DEACTIVE_TO_LOST', N'From Deactive to Lost', NULL, 21, 1,
         CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ), 1, CAST ( N'2016-02-23T00:47:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4115, N'REPLACE_REPLACEMENT_CARD', N'Replace Replacement Card Limitation Override',
         N'Replace a card that is already in replacement status within initial 10 day window', 19, 0,
         CAST ( N'2016-03-15T01:25:10.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-18T16:20:14.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4116, N'BULK_DEACTIVATE', N'Bulk Deactivate', N'Services page Bulk Deactivation Action', 22, 1,
         CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ), 1, CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4118, N'FAILED_KYC_REGISTRATION_SEARCH', N'Failed Registration Search (KYC)',
         N'Services page Failed Registration Search (KYC) Action', 22, 1,
         CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ), 1, CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4120, N'VMS_RESET_PIN', N'VMS Reset PIN', N'Reset the PIN for a VMS product.', 26, 1,
         CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ), 1, CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4121, N'VMS_ADJUST_BALANCE', N'VMS Adjust Balance',
         N'Allows the user to create and submit adjustment records to VMS card accounts', 26, 1,
         CAST ( N'2016-04-04T23:24:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-06T13:40:10.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4122, N'VMS_ACTIVATE_CARD', N'VMS Activate Card', N'Activate an Inactive VMS product.', 26, 0,
         CAST ( N'2016-04-04T23:24:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-03T10:11:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4123, N'ADMIN_VMS_RESPONSE_MAPPINGS', N'Administer the VMS Response Mappings',
         N'Administer the VMS Response Mappings', 26, 1, CAST ( N'2016-04-04T23:24:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-04-04T23:24:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4124, N'VMS_REGISTER_CARD_POSTAL_CODE_ONLY', N'VMS Register Card - Postal Code Only',
         N'Register VMS card by Postal Code only', 26, 1, CAST ( N'2016-04-04T23:26:41.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-04-04T23:26:41.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4140, N'VMS_RELEASE_PRE_AUTH', N'VMS Release Pre-Auth', N'Allow changing a VMS account fee plan.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4141, N'VMS_EXPORT_CSV', N'VMS Export CSV', N'Allow exports comma delimited files.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4142, N'VMS_ORDER_NEW_CARD', N'VMS Order New Card', N'Allow requests for new cards.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4143, N'VMS_CHANGE_FEE_PLAN', N'VMS Change Fee Plan', N'Allow changing a VMS account fee plan.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4144, N'VMS_UPGRADE_FROM_STARTER_CARD', N'VMS Upgrade from Starter Card', N'Allow upgrading from starter card.',
      26, 0, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-03T10:27:49.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4145, N'VMS_REPLACE_CARD', N'VMS Replace Card', N'Allow the requesting of replace cards.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4146, N'VMS_RESET_ONLINE_PASSWORD', N'VSM Online Password Change',
         N'Allow the handling of requests to change the customer''s online password.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4147, N'VMS_SEND_ACCOUNT_STATEMENT', N'VMS Send Account Statement',
         N'Allow the initiation of producing and send of account statements to customers.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4148, N'VMS_SEND_DIRECT_DEPOSIT_FORM', N'VMS Send Direct Deposit Form', N'DESCRIPTION', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4149, N'VMS_C2C_TRANSFER_REQUEST', N'VMS C2C Transfer - Request', N'Ability to request a card to card transfer.',
      26, 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4150, N'VMS_C2C_TRANSFER_APPROVE', N'VMS C2C Transfer - Approve',
         N'Ability to approve or reject card to card transfer requests.', 26, 1,
         CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:06.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4151, N'VMS_SEND_FORM', N'VMS Send Form', N'Allow the user send forms to the caller.', 26, 1,
         CAST ( N'2016-04-15T16:03:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-04-15T16:03:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4152, N'VMS_EDIT_CARD_HOLDER', N'Edit VMS card holder information',
         N'Allow user to edit card holder information.', 26, 1, CAST ( N'2016-04-15T16:03:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-04-15T16:03:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4298, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_CLOSED', N'VMS Change Status from Inactive to Closed',
         N'VMS Change Status from Inactive to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:51:54.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4299, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_SPEND_DOWN', N'VMS Change Status from Inactive to Spend Down',
         N'VMS Change Status from Inactive to Spend Down', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T13:52:08.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4300, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_LOST_STOLEN', N'VMS Change Status from Active to Lost-Stolen',
         N'VMS Change Status from Active to Lost-Stolen', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T13:48:27.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4301, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_DAMAGED', N'VMS Change Status from Active to Damage',
         N'VMS Change Status from Active to Damage', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:48:11.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4302, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_CLOSED', N'VMS Change Status from Active to Closed',
         N'VMS Change Status from Active to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:47:59.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4303, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_ON_HOLD', N'VMS Change Status from Active to On Hold',
         N'VMS Change Status from Active to On Hold', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:49:13.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4304, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_RESTRICTED', N'VMS Change Status from Active to Restricted',
         N'VMS Change Status from Active to Restricted', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:49:28.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4305, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_MONITORED', N'VMS Change Status from Active to Monitored',
         N'VMS Change Status from Active to Monitored', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:49:53.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4306, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_HOT_CARDED', N'VMS Change Status from Active to Hot Carded',
         N'VMS Change Status from Active to Hot Carded', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:48:19.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4307, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_SPEND_DOWN', N'VMS Change Status from Active to Spend Down',
         N'VMS Change Status from Active to Spend Down', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:49:42.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4309, N'VMS_CHANGE_STATUS_FROM_LOST_STOLEN_TO_CLOSED', N'VMS Change Status from Lost-Stolen to Closed',
         N'VMS Change Status from Lost-Stolen to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T13:52:32.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4310, N'VMS_CHANGE_STATUS_FROM_LOST_STOLEN_TO_SPEND_DOWN', N'VMS Change Status from Lost-Stolen to Spend Down',
         N'VMS Change Status from Lost-Stolen to Spend Down', 24, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-03T13:53:03.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4311, N'VMS_CHANGE_STATUS_FROM_DAMAGED_TO_LOST_STOLEN', N'VMS Change Status from Damage to Lost-Stolen',
         N'VMS Change Status from Damage to Lost-Stolen', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T13:50:34.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4312, N'VMS_CHANGE_STATUS_FROM_DAMAGED_TO_CLOSED', N'VMS Change Status from Damage to Closed',
         N'VMS Change Status from Damage to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:50:27.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4314, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_LOST_STOLEN', N'VMS Change Status from On Hold to Lost-Stolen',
         N'VMS Change Status from On Hold to Lost-Stolen', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T14:02:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4315, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_DAMAGED', N'VMS Change Status from On Hold to Damage',
         N'VMS Change Status from On Hold to Damage', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T14:01:50.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4316, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_CLOSED', N'VMS Change Status from On Hold to Closed',
         N'VMS Change Status from On Hold to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T14:01:39.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4317, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_RESTRICTED', N'VMS Change Status from On Hold to Restricted',
         N'VMS Change Status from On Hold to Restricted', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T14:02:49.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4318, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_MONITORED', N'VMS Change Status from On Hold to Monitored',
         N'VMS Change Status from On Hold to Monitored', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T14:02:23.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4319, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_HOT_CARDED', N'VMS Change Status from On Hold to Hot Carded',
         N'VMS Change Status from On Hold to Hot Carded', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T14:01:59.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4320, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_SPEND_DOWN', N'VMS Change Status from On Hold to Spend Down',
         N'VMS Change Status from On Hold to Spend Down', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T14:02:42.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4322, N'VMS_CHANGE_STATUS_FROM_RESTRICTED_TO_LOST_STOLEN', N'VMS Change Status from Restricted to Lost-Stolen',
         N'VMS Change Status from Restricted to Lost-Stolen', 24, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-03T14:03:37.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4323, N'VMS_CHANGE_STATUS_FROM_RESTRICTED_TO_CLOSED', N'VMS Change Status from Restricted to Closed',
         N'VMS Change Status from Restricted to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T14:03:13.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4324, N'VMS_CHANGE_STATUS_FROM_RESTRICTED_TO_HOT_CARDED', N'VMS Change Status from Restricted to Hot Carded',
         N'VMS Change Status from Restricted to Hot Carded', 24, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-03T14:03:19.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4325, N'VMS_CHANGE_STATUS_FROM_RESTRICTED_TO_SPEND_DOWN', N'VMS Change Status from Restricted to Spend Down',
         N'VMS Change Status from Restricted to Spend Down', 24, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-03T14:03:27.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4327, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_LOST_STOLEN', N'VMS Change Status from Monitored to Lost-Stolen',
         N'VMS Change Status from Monitored to Lost-Stolen', 24, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-03T13:56:44.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4328, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_DAMAGED', N'VMS Change Status from Monitored to Damaged',
         N'VMS Change Status from Monitored to Damaged', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:56:28.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4329, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_CLOSED', N'VMS Change Status from Monitored to Closed',
         N'VMS Change Status from Monitored to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:55:59.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4330, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_ON_HOLD', N'VMS Change Status from Monitored to On Hold',
         N'VMS Change Status from Monitored to On Hold', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:57:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4331, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_RESTRICTED', N'VMS Change Status from Monitored to Restricted',
         N'VMS Change Status from Monitored to Restricted', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T13:57:43.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4332, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_HOT_CARDED', N'VMS Change Status from Monitored to Hot Carded',
         N'VMS Change Status from Monitored to Hot Carded', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T13:56:35.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4333, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_SPEND_DOWN', N'VMS Change Status from Monitored to Spend Down',
         N'VMS Change Status from Monitored to Spend Down', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1, CAST ( N'2016-05-03T13:58:47.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4335, N'VMS_CHANGE_STATUS_FROM_HOT_CARDED_TO_CLOSED', N'VMS Change Status from Hot Carded to Closed',
         N'VMS Change Status from Hot Carded to Closed', 24, 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-05-03T13:51:15.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4336, N'VMS_CHANGE_STATUS_FROM_HOT_CARDED_TO_SPEND_DOWN', N'VMS Change Status from Hot Carded to Spend Down',
         N'VMS Change Status from Hot Carded to Spend Down', 24, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-03T13:51:27.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4338, N'VMS_REVERSE_FEE', N'VMS Reverse Fee', N'Reverse a transaction fee', 26, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4339, N'VMS_ADJUST_BALANCE_TO_NEGATIVE', N'VMS Adjust Balance to Negative',
         N'Allows user to adjust a VMS account balance into the negative.', 26, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-06T13:41:55.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4340, N'VMS_EDIT_ACCOUNT_HOLDER_RESTRICTED_FIELDS', N'VMS Edit Account Holder Restricted Fields',
         N'Allows user to modify sensitive account details.', 26, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4341, N'VMS_RAISE_DISPUTE', N'VMS Raise Dispute', N'Dispute a VMS transaction.', 26, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4342, N'API_SESSION_SUMMARY', N'API Session Summary',
         N'Ability to use the {host}/rest/external/session/{id} session summary service.', 9, 1,
         CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-02T16:23:26.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4343, N'QUEUE_LD_CS_SPANISH', N'Queue - LD CS Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4344, N'QUEUE_RITE_AID_FUEL_REWARD_ENGLISH', N'Queue - Rite Aid Fuel Reward English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4345, N'QUEUE_STRIPES_ENGLISH', N'Queue - Stripes English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4346, N'QUEUE_VANILLA_RELOAD_SPANISH', N'Queue - Vanilla Reload Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4347, N'QUEUE_MASTERCARD_ENGLISH', N'Queue - MasterCard_English', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4348, N'QUEUE_MASTERCARD_SPANISH', N'Queue - MasterCard_Spanish', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4349, N'QUEUE_PAYPAL_ENGLISH', N'Queue - PayPal English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4350, N'QUEUE_PAYPAL_SPANISH', N'Queue - PayPal Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4351, N'QUEUE_PEACHPASS_ENGLISH', N'Queue - PeachPass English', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4352, N'QUEUE_PEACHPASS_SPANISH', N'Queue - PeachPass Spanish', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4353, N'QUEUE_PREPOSA_ENGLISH', N'Queue - Preposa English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4354, N'QUEUE_JAX_CANADA_VRN_ENGLISH', N'Queue - Jax Canada VRN English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4355, N'QUEUE_PREPOSA_SPANISH', N'Queue - Preposa Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4356, N'QUEUE_STRIPES_SPANISH', N'Queue - Stripes Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4357, N'QUEUE_SUNPASS_ENGLISH', N'Queue - SunPass - English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4358, N'QUEUE_SUNPASS_SPANISH', N'Queue - SunPass - Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4359, N'QUEUE_VIRTUAL_VANILLA_ENGLISH', N'Queue - Virtual Vanilla English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4360, N'QUEUE_VIRTUAL_VANILLA_SPANISH', N'Queue - Virtual Vanilla Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4361, N'QUEUE_HEALTHCARE_REWARDS_ENGLISH', N'Queue - Healthcare Rewards English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4362, N'QUEUE_HEALTHCARE_REWARDS_SPANISH', N'Queue - Healthcare Rewards Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4363, N'QUEUE_ICT_PUERTO_RICO_SPANISH', N'Queue - ICT Puerto Rico Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4364, N'QUEUE_AIRTIME', N'Queue - Airtime', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4365, N'QUEUE_AUSTRALIA_SVS', N'Queue - Australia SVS', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4366, N'QUEUE_PR_CARE', N'Queue - PR Care', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4367, N'QUEUE_PR_CARE_SPANISH', N'Queue - PR Care - Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4368, N'QUEUE_PRE_PIN_ENG_QUEUE', N'Queue - Pre Pin Eng Queue', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4369, N'QUEUE_PRE_PIN_SPANISH_QUEUE', N'Queue - Pre Pin Spanish Queue', N'Permission to use this Session Queue.',
      27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
GO
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4370, N'QUEUE_EPAY_TERMINAL_ENGLISH', N'Queue - EPay Terminal English', N'Permission to use this Session Queue.',
      27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4371, N'QUEUE_EPAY_TERMINAL_SPANISH', N'Queue - EPay Terminal Spanish', N'Permission to use this Session Queue.',
      27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4372, N'QUEUE_EPAY_VOID_CREDIT_ENGLISH', N'Queue - EPay Void/Credit English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4373, N'QUEUE_EPAY_VOID_CREDIT_SPANISH', N'Queue - EPay Void/Credit Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4374, N'QUEUE_ICT_PUERTO_RICO_ENGLISH', N'Queue - ICT Puerto Rico English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4375, N'QUEUE_ICT_USA_DOMESTIC_ENGLISH', N'Queue - ICT USA Domestic English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4376, N'QUEUE_GIFTCARD', N'Queue - GiftCard', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4377, N'QUEUE_ICT_USA_DOMESTIC_SPANISH', N'Queue - ICT USA Domestic Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4378, N'QUEUE_KIOSK_ENGLISH', N'Queue - Kiosk English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4379, N'QUEUE_KIOSK_SPANISH', N'Queue - Kiosk Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4380, N'QUEUE_MEDAGATE_ENGLISH', N'Queue - Medagate English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4381, N'QUEUE_MERCHANT_SVS_ENGLISH', N'Queue - Merchant SVS English', N'Permission to use this Session Queue.',
         27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4382, N'QUEUE_MERCHANT_SVS_FRENCH', N'Queue - Merchant SVS French', N'Permission to use this Session Queue.', 27,
      1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
      1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4383, N'QUEUE_MERCHANT_SVS_SPANISH', N'Queue - Merchant SVS Spanish', N'Permission to use this Session Queue.',
         27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4384, N'QUEUE_METROPCS_ENGLISH_NORCROSS', N'Queue - MetroPCS English Norcross',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4385, N'QUEUE_MEDAGATE_SPANISH', N'Queue - Medagate Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4386, N'QUEUE_METROPCS_SPANISH_NORCROSS', N'Queue - MetroPCS Spanish Norcross',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4387, N'QUEUE_MEXICO_VTS_ENGLISH', N'Queue - Mexico VTS English', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4388, N'QUEUE_MEXICO_VTS_SPANISH', N'Queue - Mexico VTS Spanish', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4389, N'QUEUE_PRIORITY_CARE', N'Queue - Priority Care', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4390, N'QUEUE_PRIORITY_CARE_SPANISH', N'Queue - Priority Care - Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4391, N'QUEUE_TERMINAL_SPANISH', N'Queue - Terminal - Spanish', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4392, N'QUEUE_TERMINAL_TEAM', N'Queue - Terminal - Team', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4393, N'QUEUE_TRAINING', N'Queue - Training', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4394, N'QUEUE_TRAINING_SPANISH', N'Queue - Training - Spanish', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4395, N'QUEUE_TRAINING_ALL', N'Queue - Training All', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4396, N'QUEUE_EPAY_OTHER_ENGLISH', N'Queue - EPay Other English', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4397, N'QUEUE_EPAY_OTHER_SPANISH', N'Queue - EPay Other Spanish', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4398, N'QUEUE_VTS_ENGLISH', N'Queue - VTS English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4399, N'QUEUE_VTS_FRENCH', N'Queue - VTS French', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4400, N'QUEUE_VTS_SPANISH', N'Queue - VTS Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4401, N'QUEUE_FINANCIALS_GPR_INACTIVE', N'Queue - FINANCIALS_GPR', N'Permission to use this Session Queue.', 27,
      0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
      1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4402, N'QUEUE_ZZZ_INACTIVE', N'Queue - ZZZ', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4403, N'QUEUE_VANILLA_MC_GC_FR', N'Queue - VANILLA_MC_GC_FR', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4404, N'QUEUE_NEXTCALA_ENGLISH', N'Queue - NextCALA English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4405, N'QUEUE_CCA_QUEUE', N'Queue - CCA Queue', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4406, N'QUEUE_CDVRN_FR', N'Queue - CDVRN_FR', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4407, N'QUEUE_BILLING_SPANISH', N'Queue - Billing - Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4408, N'QUEUE_BILLING_TEAM', N'Queue - Billing -Team', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4409, N'QUEUE_CUSTOMER_CARE_ALL', N'Queue - Customer Care - All', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4410, N'QUEUE_CUSTOMER_CARE_SPANISH', N'Queue - Customer Care - Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4411, N'QUEUE_ICT_FRENCH', N'Queue - ICT French', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4412, N'QUEUE_NEXTCALA_ACTIVATIONS_SPANISH_INACTIVE', N'Queue - NextCALA Activations Spanish',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4413, N'QUEUE_MY_VANILLA_CANADA_GPR_ACTIVATIONS_ENGLISH_INACTIVE',
         N'Queue - My Vanilla Canada GPR Activations English', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4414, N'QUEUE_JACKSON_HEWITT_ACTIVATIONS_ENGLISH_INACTIVE', N'Queue - Jackson Hewitt Activations English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4415, N'QUEUE_JACKSON_HEWITT_ACTIVATIONS_SPANISH_INACTIVE', N'Queue - Jackson Hewitt Activations Spanish',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4416, N'QUEUE_BOOST_INACTIVE', N'Queue - Boost', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4417, N'QUEUE_VRN', N'Queue - VRN', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4418, N'QUEUE_JAX_CARE_INACTIVE', N'Queue - JAX Care', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4419, N'QUEUE_SUNPASS_INACTIVE', N'Queue - SunPass', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4420, N'QUEUE_VISA_INACTIVE', N'Queue - VISA', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4421, N'QUEUE_VRN_SPANISH_INACTIVE', N'Queue - VRN - Spanish', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4422, N'QUEUE_WIRELESS_INACTIVE', N'Queue - Wireless', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4423, N'QUEUE_VANILLA_RELOAD_NETWORK_INACTIVE', N'Queue - Vanilla Reload Network',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4424, N'QUEUE_PEACHPASS_INACTIVE', N'Queue - PeachPass', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4425, N'QUEUE_MY_VANILLA_ACTIVATIONS_SPANISH_INACTIVE', N'Queue - My Vanilla Activations Spanish',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4426, N'QUEUE_PAYPAL', N'Queue - PayPal', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4427, N'QUEUE_NO_QUEUE_LEGACY_INACTIVE', N'Queue - No Queue - Legacy', N'Permission to use this Session Queue.',
      27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4428, N'QUEUE_JAX_CARE_SPANISH_INACTIVE', N'Queue - JAX Care - Spanish', N'Permission to use this Session Queue.',
      27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4429, N'QUEUE_LD_INACTIVE', N'Queue - LD', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4430, N'QUEUE_LD_SPANISH_INACTIVE', N'Queue - LD - Spanish', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4431, N'QUEUE_MASTERCARD_INACTIVE', N'Queue - Mastercard', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4432, N'QUEUE_MIO_INACTIVE', N'Queue - MIO', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4433, N'QUEUE_MIO_SPANISH_INACTIVE', N'Queue - MIO - Spanish', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4434, N'QUEUE_PREPOSA_INACTIVE', N'Queue - Preposa', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4435, N'QUEUE_B2B_ACTIVATION_ENGLISH', N'Queue - B2B Activation English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4436, N'QUEUE_B2B_ACTIVATION_SPANISH', N'Queue - B2B Activation Spanish',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4437, N'QUEUE_CANADA_MASTERCARD_ENGLISH', N'Queue - Canada MasterCard English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4438, N'QUEUE_DISCOVER_RAN_ENGLISH', N'Queue - Discover_RAN_English', N'Permission to use this Session Queue.',
         27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4439, N'QUEUE_DISCOVER_RAN_SPANISH', N'Queue - Discover_RAN_Spanish', N'Permission to use this Session Queue.',
         27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4440, N'QUEUE_DISCOVER_SPANISH', N'Queue - Discover_Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4441, N'QUEUE_JAX_CARE', N'Queue - Jax CARE', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4442, N'QUEUE_NEXTCALA_SPANISH_INACTIVE', N'Queue - NextCALA Spanish', N'Permission to use this Session Queue.',
      27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4443, N'QUEUE_MIO_EXISTING_SPANISH_INACTIVE', N'Queue - MIO_Existing_Spanish',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4444, N'QUEUE_DISCOVER_INACTIVE', N'Queue - Discover', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4445, N'QUEUE_TARGET_WRAP_UP_INACTIVE', N'Queue - Target Wrap Up', N'Permission to use this Session Queue.', 27,
      0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
      1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4446, N'QUEUE_TARGET_ENGLISH', N'Queue - Target English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4447, N'QUEUE_VANILLA_VISA_GC_FR', N'Queue - VANILLA_VISA_GC_FR', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4448, N'QUEUE_GPR_FR_MY_VANILLA', N'Queue - GPR FR - MY VANILLA', N'Permission to use this Session Queue.', 27, 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4449, N'QUEUE_GENERAL', N'Queue - General', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4450, N'QUEUE_VANILLA_RELOAD_ENGLISH', N'Queue - Vanilla Reload English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4451, N'QUEUE_IVR', N'Queue - IVR', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4452, N'QUEUE_HOLIDAY_WALGREENS_INACTIVE', N'Queue - Holiday Walgreens', N'Permission to use this Session Queue.',
      27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4453, N'QUEUE_MY_VANILLA_ACTIVATIONS_ENGLISH_INACTIVE', N'Queue - My Vanilla Activations English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4454, N'QUEUE_MIO_EXISTING_ENGLISH_INACTIVE', N'Queue - MIO_Existing_English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4455, N'QUEUE_NEXTCALA_ACTIVATIONS_ENGLISH_INACTIVE', N'Queue - NextCALA Activations English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4456, N'QUEUE_MY_VANILLA_CANADA_GPR_ENGLISH_INACTIVE', N'Queue - My Vanilla Canada GPR English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4457, N'QUEUE_JACKSON_HEWITT_ENGLISH_INACTIVE', N'Queue - Jackson Hewitt English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4458, N'QUEUE_JACKSON_HEWITT_SPANISH_INACTIVE', N'Queue - Jackson Hewitt Spanish',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4459, N'QUEUE_JACKSON_HEWITT_FRANCHISE_ENGLISH_INACTIVE', N'Queue - Jackson Hewitt Franchise English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4460, N'QUEUE_JACKSON_HEWITT_FRANCHISE_SPANISH_INACTIVE', N'Queue - Jackson Hewitt Franchise Spanish',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4461, N'QUEUE_BOOST_ENGLISH_INACTIVE', N'Queue - Boost_English', N'Permission to use this Session Queue.', 27, 0,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4462, N'QUEUE_BOOST_SPANISH_INACTIVE', N'Queue - Boost_Spanish', N'Permission to use this Session Queue.', 27, 0,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4463, N'QUEUE_WALMART_GAS_ENGLISH_INACTIVE', N'Queue - WalMart Gas English',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4464, N'QUEUE_WALMART_GAS_SPANISH_INACTIVE', N'Queue - WalMart Gas Spanish',
         N'Permission to use this Session Queue.', 27, 0, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4465, N'QUEUE_TARGET_SPANISH', N'Queue - Target Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4466, N'QUEUE_VISA_ENGLISH', N'Queue - VISA_English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4467, N'QUEUE_VANILLA_VISA', N'Queue - VANILLA_VISA', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4468, N'QUEUE_CDPOSA_EN', N'Queue - CDPOSA_EN', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4469, N'QUEUE_GPR_FR_MY_VANILLA_ACT', N'Queue - GPR FR - MY VANILLA ACT',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
GO
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4470, N'QUEUE_CDPOSA_FR', N'Queue - CDPOSA_FR', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4471, N'QUEUE_VANILLA_MC', N'Queue - VANILLA_MC', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4472, N'QUEUE_WIRELESS_ENGLISH', N'Queue - Wireless_English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4473, N'QUEUE_VISA_SPANISH', N'Queue - VISA_Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4474, N'QUEUE_WIRELESS_SPANISH', N'Queue - Wireless_Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4475, N'QUEUE_CANADA_VISA_ENGLISH', N'Queue - Canada Visa English', N'Permission to use this Session Queue.', 27,
      1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
      1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4476, N'QUEUE_DISCOVER_ENGLISH', N'Queue - Discover_English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4477, N'QUEUE_JAX_ACTIVATION', N'Queue - Jax Activation', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4478, N'QUEUE_LD_CS_ENGLISH', N'Queue - LD CS English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4479, N'QUEUE_AIRTIME_INACTIVE', N'Queue - AirTime', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4480, N'QUEUE_BILLING_TEAM_INACTIVE', N'Queue - Billing - Team', N'Permission to use this Session Queue.', 27, 0,
      CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4481, N'QUEUE_GIFT_CARD_INACTIVE', N'Queue - Gift Card', N'Permission to use this Session Queue.', 27, 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4482, N'VMS_VIEW_ACCOUNT_HOLDER_DOCUMENTS', N'VMS View Account Holder Documents',
         N'View Account Holder Documents.', 26, 1, CAST ( N'2016-06-02T00:24:07.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-06-02T00:24:07.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4483, N'QUEUE_IDS_LOYALTY_ENGLISH', N'Queue - IDS Loyalty English', N'Permission to use this Session Queue.', 27,
      1, CAST ( N'2016-06-15T14:08:59.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-15T14:08:59.0000000' AS DATETIME2 ),
      1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4484, N'QUEUE_IDS_LOYALTY_SPANISH', N'Queue - IDS Loyalty Spanish', N'Permission to use this Session Queue.', 27,
      1, CAST ( N'2016-06-15T14:09:28.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-15T14:09:28.0000000' AS DATETIME2 ),
      1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4485, N'QUEUE_U_FAN_ENGLISH', N'Queue - U Fan English', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-15T14:10:51.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-15T14:10:51.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4486, N'QUEUE_U_FAN_SPANISH', N'Queue - U Fan Spanish', N'Permission to use this Session Queue.', 27, 1,
         CAST ( N'2016-06-15T14:11:49.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-15T14:11:49.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4487, N'SEARCH_JIRA', N'Search JIRA', N'Search JIRA issues.', 2, 1,
         CAST ( N'2016-06-24T00:03:47.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-24T00:03:47.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4488, N'QUEUE_RITE_AID_OLYMPIC_REWARDS_ENGLISH', N'Queue - Rite Aid Olympic Rewards English',
         N'Permission to use this Session Queue.', 27, 1, CAST ( N'2016-07-06T17:42:04.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-07-06T17:42:04.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4489, N'VMS_CHANGE_STATUS_WITH_EFFECTIVE_DATE', N'VMS Change Status with Effective Date',
         N'Allows user to set a future effective date when changing a VMS status.', 26, 1,
         CAST ( N'2016-07-19T02:46:56.0000000' AS DATETIME2 ), 1, CAST ( N'2016-07-19T02:46:56.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4490, N'VMS_VIEW_DISPUTE', N'VMS View Dispute', N'Ability to view an in-progress dispute', 26, 1,
         CAST ( N'2016-07-22T10:50:29.0000000' AS DATETIME2 ), 1, CAST ( N'2016-07-22T10:50:29.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4491, N'SPLUNK_LINK', N'Splunk Link', N'Permission to see the Correlation ID as a link to Splunk.', 1, 1,
         CAST ( N'2016-08-02T13:58:20.0000000' AS DATETIME2 ), 1, CAST ( N'2016-08-02T13:58:20.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4492, N'SEARCH_MICROSOFT', N'Status Search - Microsoft', N'Perform a Status lookup for Microsoft products', 28, 1,
      CAST ( N'2016-08-04T20:25:09.0000000' AS DATETIME2 ), 1, CAST ( N'2016-08-04T20:25:09.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4493, N'VIEW_ALL_JOBS', N'View All Jobs', N'Ability to view jobs submitted by users other than yourself.', 1, 1,
      CAST ( N'2017-12-08T14:26:18.3100000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.3100000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4494, N'OVERRIDE_SHORT_PAY', N'Override Short Pay',
         N'Ability to override the short pay match found for both single and bulk card deactivation.', 1, 1,
         CAST ( N'2017-12-08T14:26:18.6630000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.6630000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4495, N'GC_REPLACE_CARD_USE_NEW_CARD_NUMBER', N'Use New Card Number on Replace Card',
         N'Show the checkbox to use a new card number when replacing a Greencard card.', 1, 1,
         CAST ( N'2017-12-08T14:26:18.6730000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.6730000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4496, N'VMS_CHANGE_STATUS_FROM_PASSIVE_TO_ACTIVE', N'VMS Change Status from Passive to Active',
         N'VMS Change Status from Passive to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4497, N'VMS_CHANGE_STATUS_FROM_PASSIVE_TO_LOST_STOLEN', N'VMS Change Status from Passive to Lost-Stolen',
         N'VMS Change Status from Passive to Lost-Stolen', 1, 1, CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4498, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_LOST_STOLEN', N'VMS Change Status from Inactive to Lost-Stolen',
         N'VMS Change Status from Inactive to Lost-Stolen', 1, 1, CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4499, N'VMS_CHANGE_STATUS_FROM_LOST_STOLEN_TO_INACTIVE', N'VMS Change Status from Lost-Stolen to Inactive',
         N'VMS Change Status from Lost-Stolen to Inactive', 1, 1, CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:26:18.6830000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4500, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_DAMAGED', N'VMS Change Status from Inactive to Damaged',
         N'VMS Change Status from Inactive to Damaged', 1, 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4501, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_ON_HOLD', N'VMS Change Status from Inactive to On Hold',
         N'VMS Change Status from Inactive to On Hold', 1, 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4502, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_RESTRICTED', N'VMS Change Status from Inactive to Restricted',
         N'VMS Change Status from Inactive to Restricted', 1, 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4503, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_MONITORED', N'VMS Change Status from Inactive to Monitored',
         N'VMS Change Status from Inactive to Monitored', 1, 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4504, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_HOT_CARDED', N'VMS Change Status from Inactive to Hot Carded',
         N'VMS Change Status from Inactive to Hot Carded', 1, 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4505, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_RETURNED_MAIL', N'VMS Change Status from Inactive to Returned Mail',
         N'VMS Change Status from Inactive to Returned Mail', 1, 1,
         CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4506, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_RETURNED_MAIL', N'VMS Change Status from Active to Returned Mail',
         N'VMS Change Status from Active to Returned Mail', 1, 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4507, N'VMS_CHANGE_STATUS_FROM_ACTIVE_TO_INACTIVE', N'VMS Change Status from Active to Inactive',
         N'VMS Change Status from Active to Inactive', 1, 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4508, N'VMS_CHANGE_STATUS_FROM_ACTIVE_UNREGISTERED_TO_CLOSED',
         N'VMS Change Status from Active-Unregistered to Closed',
         N'VMS Change Status from Active-Unregistered to Closed', 1, 1,
         CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4509, N'VMS_CHANGE_STATUS_FROM_ACTIVE_UNREGISTERED_TO_LOST_STOLEN',
         N'VMS Change Status from Active-Unregistered to Lost-Stolen',
         N'VMS Change Status from Active-Unregistered to Lost-Stolen', 1, 1,
         CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.6870000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4510, N'VMS_CHANGE_STATUS_FROM_INACTIVE_TO_ACTIVE', N'VMS Change Status from Inactive to Active',
         N'VMS Change Status from Inactive to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4511, N'VMS_CHANGE_STATUS_FROM_LOST_STOLEN_TO_ACTIVE', N'VMS Change Status from Lost-Stolen to Active',
         N'VMS Change Status from Lost-Stolen to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4512, N'VMS_CHANGE_STATUS_FROM_DAMAGED_TO_ACTIVE', N'VMS Change Status from Damaged to Active',
         N'VMS Change Status from Damaged to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4513, N'VMS_CHANGE_STATUS_FROM_ON_HOLD_TO_ACTIVE', N'VMS Change Status from On Hold to Active',
         N'VMS Change Status from On Hold to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4514, N'VMS_CHANGE_STATUS_FROM_RESTRICTED_TO_ACTIVE', N'VMS Change Status from Restricted to Active',
         N'VMS Change Status from Restricted to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4515, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_ACTIVE', N'VMS Change Status from Monitored to Active',
         N'VMS Change Status from Monitored to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4516, N'VMS_CHANGE_STATUS_FROM_HOT_CARDED_TO_ACTIVE', N'VMS Change Status from Hot Carded to Active',
         N'VMS Change Status from Hot Carded to Active', 1, 1, CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.6970000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4517, N'RESEND_DISPUTE_DOCUMENTS', N'Resend Dispute Documents', N'Ability to resend dispute documents', 1, 1,
         CAST ( N'2017-12-08T14:26:18.7300000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.7300000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4518, N'VMS_MANAGE_PRODUCT_TYPES', N'VMS Manage Product Types',
         N'Manage which VMS product types are available for use with certain VMS actions.', 1, 1,
         CAST ( N'2017-12-08T14:26:18.7500000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.7500000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4519, N'VMS_REGISTER_CARD_PERSONALIZED', N'VMS Register Card - Personalized', N'Register a Personalized VMS Card',
      1, 1, CAST ( N'2017-12-08T14:26:18.7630000' AS DATETIME2 ), 1,
      CAST ( N'2017-12-08T14:26:18.7630000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4520, N'BULK_PRODUCT_EXPORT', N'Bulk Product Export',
         N'Ability to perform a bulk product export from the Services page.', 1, 1,
         CAST ( N'2017-12-08T14:26:18.7700000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.7700000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4521, N'SHOW_FILE_PASSWORD', N'Show File Password', N'Show Compress and Encrypted File Password', 1, 1,
         CAST ( N'2017-12-08T14:26:18.8030000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.8030000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4522, N'VMS_CHANGE_STATUS_FROM_MONITORED_TO_INACTIVE', N'VMS Change Status from Monitored to Inactive',
         N'VMS Change Status from Monitored to Inactive', 1, 1, CAST ( N'2017-12-08T14:26:18.8400000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:18.8400000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4524, N'SESSION_TYPE_CALL_CENTER', N'Session Type - Call',
         N'Ability to create a session with a call detail component.', 1, 1,
         CAST ( N'2017-12-08T14:26:18.8530000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:18.8530000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4536, N'SEARCH_BY_VANILLA_DIRECT', N'Vanilla Direct Search',
         N'Ability to perform Vanilla Direct (Cashtie) searches.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.4300000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.4300000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4543, N'QUEUE_FRD_BAD_CREDIT_1', N'Queue - Bad Credit 1 (<$10)', N'Permission to use this Session Queue.', 1, 1,
      CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4544, N'QUEUE_FRD_BAD_CREDIT_2', N'Queue - Bad Credit 2', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4545, N'QUEUE_FRD_BAD_CREDIT_3', N'Queue - Bad Credit 3', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4546, N'QUEUE_FRD_BAD_CREDIT_4', N'Queue - Bad Credit 4', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4547, N'QUEUE_FRD_GIFT_INACTIVE', N'Queue - Gift Inactive', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4548, N'QUEUE_FRD_REPLACEMENT_CARD_ACTIVATION', N'Queue - Replacement Card Activation',
         N'Permission to use this Session Queue.', 1, 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4549, N'QUEUE_FRD_WALMART_COM', N'Queue - Walmart.com', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4550, N'QUEUE_FRD_GPR_INACTIVE', N'Queue - GPR Inactive', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4551, N'QUEUE_FRD_VRN_INACTIVE', N'Queue - VRN Inactive', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4552, N'QUEUE_FRD_PAYPAL_INACTIVE', N'Queue - PayPal Inactive', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4553, N'QUEUE_FRD_CANADA_DISPUTE', N'Queue - Canada Dispute', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4554, N'QUEUE_FRD_GIFTCARD_DISPUTE', N'Queue - Giftcard Dispute', N'Permission to use this Session Queue.', 1, 1,
      CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4555, N'QUEUE_FRD_PAYPAL_DISPUTE', N'Queue - PayPal Dispute', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4556, N'QUEUE_FRD_GPR_DISPUTE_FORM', N'Queue - GPR Dispute Form', N'Permission to use this Session Queue.', 1, 1,
      CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4557, N'QUEUE_FRD_GPR_DISPUTE', N'Queue - GPR Dispute', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4558, N'QUEUE_FRD_VRN_DISPUTE', N'Queue - VRN Dispute', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4559, N'QUEUE_FRD_DISCOVER_CHARGEBACK', N'Queue - Discover Chargeback', N'Permission to use this Session Queue.',
      1, 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1,
      CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4560, N'QUEUE_FRD_MC_CHARGEBACK', N'Queue - MC Chargeback', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4561, N'QUEUE_FRD_VISA_CHARGEBACK', N'Queue - VISA Chargeback', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4562, N'QUEUE_FRD_LAW_ENFORCEMENT', N'Queue - Law Enforcement', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4563, N'QUEUE_FRD_VRN_DAMAGED_PINS', N'Queue - VRN Damaged Pins', N'Permission to use this Session Queue.', 1, 1,
      CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4564, N'QUEUE_FRD_PAYPAL_DAMAGED_PINS', N'Queue - PayPal Damaged Pins', N'Permission to use this Session Queue.',
      1, 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1,
      CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4565, N'QUEUE_FRD_PAYPAL_REDEMPTION_ISSUE', N'Queue - PayPal Redemption Issue',
         N'Permission to use this Session Queue.', 1, 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4566, N'QUEUE_FRD_REPLACEMENT_CARD_REQUESTS', N'Queue - Replacement Card Requests',
         N'Permission to use this Session Queue.', 1, 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4567, N'QUEUE_FRD_MERCHANT_FRAUD', N'Queue - Merchant Fraud', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4568, N'QUEUE_FRD_LOST_CARD', N'Queue - Lost Card', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4569, N'QUEUE_FRD_MY_VANILLA_CANCELLATION', N'Queue - My Vanilla Cancellation',
         N'Permission to use this Session Queue.', 1, 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4570, N'QUEUE_FRD_PAYPAL_REFUNDS', N'Queue - PayPal Refunds', N'Permission to use this Session Queue.', 1, 1,
         CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4571, N'QUEUE_FRD_MONTHLY_FEE_CREDIT', N'Queue - Monthly Fee Credit', N'Permission to use this Session Queue.', 1,
      1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:19.6900000' AS DATETIME2 ),
      1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4572, N'VMS_PROVISION_MOBILE_WALLET', N'VMS Provision Mobile Wallet',
         N'Ability to enable Mobile Wallet on a VMS Customer Account.', 1, 1,
         CAST ( N'2017-12-08T14:26:20.0670000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.0670000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4573, N'REMOVE_SELECTION', N'Remove Selection', N'Ability to remove a selection from a session.', 1, 1,
         CAST ( N'2017-12-08T14:26:20.0730000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.0730000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4574, N'SESSION_TYPE_CASE', N'Session Type - Case', N'Ability to create a Case session.', 1, 1,
         CAST ( N'2017-12-08T14:26:20.1000000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.1000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4575, N'SESSION_TYPE_BAD_CREDIT', N'Session Type - Bad Credit', N'Ability to create a Bad Credit session.', 1, 1,
      CAST ( N'2017-12-08T14:26:20.1830000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.1830000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4576, N'VMS_MOBILE_WALLET_FRAUD_CHECK_OVERRIDE', N'VMS Mobile Wallet Fraud Check Override',
         N'Ability to override fraud checks when provisioning VMS Mobile Wallet', 1, 1,
         CAST ( N'2017-12-08T14:26:20.1900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.1900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4577, N'PRIVATE_COMMENTS', N'Private Comments', N'Ability to add and view private comments', 1, 1,
         CAST ( N'2017-12-08T14:26:20.3900000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.3900000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4578, N'SEARCH_SESSIONS_ALL', N'Session Search - All', N'Ability to search ALL session classes', 1, 1,
         CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4579, N'SEARCH_SESSIONS_CALL_CENTER', N'Session Search - Call Center',
         N'Ability to search Call Center session classes', 1, 1, CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ),
         1, CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 4580, N'SEARCH_SESSIONS_GENERAL', N'Session Search - General', N'Ability to search General session classes', 1, 1,
      CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission] ([id], [system_name], [display_name], [description], [permission_category_id], [active], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4581, N'SEARCH_SESSIONS_CASE', N'Session Search - Case', N'Ability to search Case session classes', 1, 1,
         CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ), 1, CAST ( N'2017-12-08T14:26:20.4000000' AS DATETIME2 ),
         1 )
SET IDENTITY_INSERT [dbo].[permission] OFF
SET IDENTITY_INSERT [dbo].[permission_category] ON

INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 1, N'UNCATEGORIZED', N'Uncategorized', N'Permissions that have not been assigned to a Permission Category.', 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-05-18T16:38:16.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 2, N'SEARCH', N'SEARCH', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-07-13T09:37:20.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 3, N'PARTNER PERMISSION', N'GPR PARTNER PERMISSION', NULL, 0,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1, CAST ( N'2016-03-04T12:42:01.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 4, N'ADMIN', N'ADMIN', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 5, N'NOR', N'NOR', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 6, N'PAY PAL', N'PAY PAL', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 7, N'MERCHANDISE', N'MERCHANDISE', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 8, N'TROUBLESHOOTING', N'TROUBLESHOOTING', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 9, N'ADMINISTRATION', N'ADMINISTRATION', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-07-27T11:25:19.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 10, N'RBC', N'RBC', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 11, N'CALL DETAILS', N'CALL DETAILS', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-07-27T11:24:27.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 12, N'JAX', N'JAX', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 13, N'FAST CARD', N'FAST CARD', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 14, N'RECON', N'RECON', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 15, N'CHALLENGE PASSWORD', N'CHALLENGE PASSWORD', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 16, N'EXPORT OPTIONS', N'EXPORT OPTIONS', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 17, N'LIMITS', N'LIMITS', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 18, N'TRANSACTION HISTORY', N'TRANSACTION HISTORY', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 19, N'GREEN CARD', N'GREEN CARD', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-07-27T11:19:48.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 20, N'CARD STATUS', N'CARD STATUS', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 21, N'GREEN CARD STATUS', N'GREEN CARD STATUS', NULL, 0, CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1,
      CAST ( N'2016-02-23T00:27:01.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 22, N'SERVICES', N'Services', N'Permissions associated to the Services page', 0,
         CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ), 1, CAST ( N'2016-03-15T01:25:11.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES
    ( 24, N'GPR_STATUS_CHANGES', N'GPR Status Changes', NULL, 0, CAST ( N'2016-05-03T13:47:32.0000000' AS DATETIME2 ),
      1, CAST ( N'2016-05-03T14:03:54.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 26, N'GPR', N'GPR', NULL, 0, CAST ( N'2016-05-06T13:38:54.0000000' AS DATETIME2 ), 1,
         CAST ( N'2016-07-27T11:28:35.0000000' AS DATETIME2 ), 1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 27, N'QUEUES', N'Queues', N'Permissions related to Session Queues', 0,
         CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ), 1, CAST ( N'2016-06-02T00:15:07.0000000' AS DATETIME2 ),
         1 )
INSERT [dbo].[permission_category] ([id], [system_name], [display_name], [description], [locked], [created_date], [created_by], [modified_date], [modified_by])
VALUES ( 28, N'STATUS_SEARCH', N'Status Search', N'Quick Third-Party Status Search', 0,
         CAST ( N'2016-08-04T20:25:09.0000000' AS DATETIME2 ), 1, CAST ( N'2016-08-04T20:25:09.0000000' AS DATETIME2 ),
         1 )
SET IDENTITY_INSERT [dbo].[permission_category] OFF
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 0, 0 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 1, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 1, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 1, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 1, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 1, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 1, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 1, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 2, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 2, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 2, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 2, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 2, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 2, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 2, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 3, 7 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 3, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 3, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 3, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 3, 11 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 3, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 4, 7 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 4, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 4, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 4, 11 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 4, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 5, 7 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 5, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 5, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 5, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 5, 11 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 5, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 6, 7 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 6, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 6, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 6, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 6, 11 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 6, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 7, 7 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 7, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 7, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 7, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 7, 11 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 7, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 8, 7 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 8, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 8, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 8, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 8, 11 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 8, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 9, 6 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 10, 6 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 11, 6 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 12, 6 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 13, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 13, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 14, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 14, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 15, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 15, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 15, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 15, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 15, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 15, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 15, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 16, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 16, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 16, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 16, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 16, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 16, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 16, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 17, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 17, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 17, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 17, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 17, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 17, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 17, 131 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 18, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 18, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 18, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 18, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 18, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 18, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 18, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 19, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 19, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 19, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 19, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 19, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 19, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 19, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 20, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 20, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 20, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 20, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 20, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 20, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 20, 38 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 21, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 21, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 21, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 21, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 21, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 21, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 21, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 22, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 22, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 22, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 22, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 22, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 22, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 22, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 23, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 23, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 23, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 23, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 23, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 23, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 24, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 24, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 24, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 24, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 24, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 24, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 26, 28 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 26, 118 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 26, 119 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 26, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 26, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 28, 123 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 28, 125 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 28, 126 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 28, 127 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 28, 128 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 28, 129 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 28, 130 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 132 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 133 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 134 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 135 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 136 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 137 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 138 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 139 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 34, 140 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 24 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 141 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 142 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 143 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 144 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 145 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 146 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 38, 147 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 40, 67 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 40, 68 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 40, 69 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 40, 70 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 80 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 81 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 82 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 83 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 84 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 85 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 86 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 87 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 88 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 42, 89 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 71 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 72 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 73 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 74 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 75 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 76 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 77 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 78 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 44, 79 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 13 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 14 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 15 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 16 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 17 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 18 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 19 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 20 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 21 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 22 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 23 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 24 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 25 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 26 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 27 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 28 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 29 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 30 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 31 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 32 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 48, 33 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 50, 122 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 51, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 51, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 51, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 51, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 51, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 51, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 54, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 54, 34 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 55, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 55, 34 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 56, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 56, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 56, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 56, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 56, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 56, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 56, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 57, 66 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 58, 66 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 59, 35 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 60, 35 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 61, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 61, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 61, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 61, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 61, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 61, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 61, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 62, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 62, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 62, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 62, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 62, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 62, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 62, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 63, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 63, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 63, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 63, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 63, 36 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 63, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 63, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 64, 35 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 65, 35 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 66, 35 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 71, 5 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 13 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 14 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 15 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 16 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 17 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 18 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 19 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 20 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 21 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 22 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 23 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 24 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 25 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 26 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 27 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 28 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 29 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 30 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 31 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 32 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 74, 33 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 79, 39 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 40 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 41 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 42 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 44 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 45 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 46 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 47 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 48 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 82, 49 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 50 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 51 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 52 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 53 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 54 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 55 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 56 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 83, 57 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 89, 58 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 89, 59 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 89, 60 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 89, 61 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 90, 62 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 90, 63 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 90, 64 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 90, 65 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 90, 861 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 95, 67 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 95, 68 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 95, 69 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 95, 70 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 71 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 72 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 73 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 74 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 75 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 76 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 77 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 78 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 96, 79 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 80 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 81 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 82 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 83 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 84 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 85 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 86 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 87 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 88 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 97, 89 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 90 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 91 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 92 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 93 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 94 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 95 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 96 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 97 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 100, 98 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 105, 99 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 105, 100 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 105, 101 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 105, 102 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 106, 58 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 106, 59 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 106, 60 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 106, 61 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 106, 103 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 106, 104 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 110, 105 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 113, 6 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 106 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 107 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 108 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 109 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 110 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 111 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 112 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 113 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 114, 114 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 115, 115 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 119, 116 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 119, 117 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 120, 28 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 120, 118 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 120, 119 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 120, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 120, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 122, 8 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 122, 9 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 122, 10 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 122, 12 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 122, 37 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 122, 38 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 126, 123 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 126, 125 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 126, 126 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 126, 127 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 126, 128 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 126, 129 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 126, 130 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 132 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 133 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 134 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 135 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 136 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 137 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 138 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 139 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 129, 140 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 130, 24 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 130, 141 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 130, 142 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 130, 143 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 130, 144 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 130, 145 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 130, 146 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 147 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 148 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 149 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 151 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 152 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 153 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 739 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 755 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 756 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 798 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 858 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 859 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 860 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 878 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 133, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 147 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 148 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 149 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 151 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 152 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 153 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 739 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 755 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 756 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 798 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 858 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 859 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 860 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 878 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 134, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 154 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 155 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 156 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 157 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 798 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 135, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 153 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 154 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 155 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 156 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 157 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 798 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 136, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 137, 5 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 137, 129 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 137, 159 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 138, 99 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 138, 100 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 138, 101 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 138, 102 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 50 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 51 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 52 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 53 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 54 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 55 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 56 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 139, 57 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 140, 665 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 141, 665 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 142, 959 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 154 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 155 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 156 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 157 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 798 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 144, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 154 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 155 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 156 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 157 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 798 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 145, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 735 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 736 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 737 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 740 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 741 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 742 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 743 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 744 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 745 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 146, 746 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 735 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 736 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 737 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 740 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 741 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 742 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 743 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 744 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 745 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 147, 746 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 148, 62 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 148, 63 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 148, 64 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 148, 65 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 148, 861 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 106 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 107 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 108 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 109 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 110 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 111 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 112 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 113 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 149, 114 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 40 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 41 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 42 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 44 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 45 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 46 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 47 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 48 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 150, 49 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 90 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 91 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 92 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 93 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 94 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 95 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 96 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 97 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 151, 98 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 152, 116 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 152, 117 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 132 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 134 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 135 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 136 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 137 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 138 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 139 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 153, 140 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 154, 73 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 154, 137 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 154, 139 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 155, 118 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 155, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 155, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 156, 118 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 156, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 156, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 157, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 157, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 157, 860 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 157, 869 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 157, 870 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 153 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 154 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 155 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 156 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 157 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 872 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 873 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 876 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 158, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 153 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 154 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 155 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 156 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 157 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 158 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 769 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 771 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 775 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 776 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 780 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 872 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 873 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 876 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 159, 897 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 160, 118 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 160, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 160, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 759 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 903 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 946 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 947 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 948 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 949 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 950 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 161, 951 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 759 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 903 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 946 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 947 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 948 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 949 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 950 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 162, 951 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 163, 903 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 71 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 72 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 73 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 74 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 75 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 76 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 77 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 78 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 173, 79 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 71 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 72 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 73 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 74 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 75 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 76 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 77 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 78 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 174, 79 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 175, 52 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 175, 53 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 177, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 177, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 178, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 178, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 180, 118 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 180, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 180, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 181, 118 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 181, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 181, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 71 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 72 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 73 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 74 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 76 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 77 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 78 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 79 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 182, 102 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 71 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 72 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 73 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 74 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 76 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 77 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 78 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 79 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 183, 102 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 184, 118 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 184, 120 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 184, 121 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 195, 970 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 195, 971 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 196, 970 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 196, 971 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 197, 970 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 197, 971 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 198, 970 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 198, 971 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 199, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 199, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 199, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 199, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 199, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 200, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 200, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 200, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 200, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 200, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 201, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 201, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 201, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 201, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 201, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 202, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 202, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 202, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 202, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 202, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 203, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 203, 973 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 203, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 203, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 203, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 204, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 204, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 204, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 204, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 204, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 205, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 205, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 205, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 205, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 205, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 206, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 206, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 206, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 206, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 206, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 206, 977 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 207, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 207, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 207, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 207, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 207, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 208, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 208, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 208, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 208, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 208, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 209, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 209, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 209, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 209, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 209, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 210, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 210, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 210, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 210, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 210, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 211, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 211, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 211, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 211, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 211, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 212, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 212, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 212, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 212, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 212, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 213, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 213, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 213, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 213, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 213, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 214, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 214, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 214, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 214, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 214, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 215, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 215, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 215, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 215, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 215, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 216, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 216, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 216, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 216, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 216, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 217, 978 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 217, 979 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 218, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 218, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 218, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 218, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 218, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 219, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 219, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 219, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 219, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 219, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 220, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 220, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 220, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 220, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 220, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 221, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 221, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 221, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 221, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 221, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 222, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 222, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 222, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 222, 975 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 222, 976 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 223, 972 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 223, 973 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 223, 974 )
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 223, 975 )
GO
INSERT [dbo].[queue_wrap_up_code_category] ([queue_id], [wrap_up_code_category_id]) VALUES ( 223, 976 )
SET IDENTITY_INSERT [dbo].[session_queue] ON

INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 0, N'No Queue - Legacy', 0, NULL, N'No Queue - Legacy', 30000, NULL, 0, N'PRODUCT', N'NONE',
            N'NO_QUEUE_LEGACY_INACTIVE', 4427 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 1, N'Customer Care - All', 1, 1, N'Customer Care - All', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
            N'CUSTOMER_CARE_ALL', 4409 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 2, N'Customer Care - Spanish', 1, 2, N'Customer Care - Spanish', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
            N'CUSTOMER_CARE_SPANISH', 4410 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 3, N'EPay Other English', 1, 3, N'EPay Other English', 60000, N'See Epay', 0, N'LOCATION', N'NOR',
            N'EPAY_OTHER_ENGLISH', 4396 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 4, N'EPay Other Spanish', 1, 4, N'EPay Other Spanish', 60000, N'See Epay', 0, N'LOCATION', N'NOR',
            N'EPAY_OTHER_SPANISH', 4397 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 5, N'EPay Terminal English', 1, 5, N'EPay Terminal English', 60000, N'See Epay', 0, N'LOCATION', N'NOR',
            N'EPAY_TERMINAL_ENGLISH', 4370 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 6, N'EPay Terminal Spanish', 1, 6, N'EPay Terminal Spanish', 60000, N'See Epay', 0, N'LOCATION', N'NOR',
            N'EPAY_TERMINAL_SPANISH', 4371 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 7, N'EPay Void/Credit English', 1, 7, N'EPay Void/Credit English', 60000, N'See Epay', 0, N'LOCATION', N'NOR',
            N'EPAY_VOID_CREDIT_ENGLISH', 4372 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 8, N'EPay Void/Credit Spanish', 1, 8, N'EPay Void/Credit Spanish', 60000, N'See Epay', 0, N'LOCATION', N'NOR',
            N'EPAY_VOID_CREDIT_SPANISH', 4373 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 9, N'ICT Puerto Rico English', 1, 9, N'ICT Puerto Rico English', 60000, N'See ICT', 1, N'LOCATION', N'NOR',
            N'ICT_PUERTO_RICO_ENGLISH', 4374 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 10, N'ICT Puerto Rico Spanish', 1, 10, N'ICT Puerto Rico Spanish', 60000, N'See ICT', 0, N'LOCATION', N'NOR',
             N'ICT_PUERTO_RICO_SPANISH', 4363 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 11, N'ICT USA Domestic English', 1, 11, N'ICT USA Domestic English', 60000, N'See ICT', 0, N'LOCATION', N'NOR',
             N'ICT_USA_DOMESTIC_ENGLISH', 4375 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 12, N'ICT USA Domestic Spanish', 1, 12, N'ICT USA Domestic Spanish', 60000, N'See ICT', 0, N'LOCATION', N'NOR',
             N'ICT_USA_DOMESTIC_SPANISH', 4377 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 13, N'Kiosk English', 1, 13, N'Kiosk English', 60000, NULL, 0, N'LOCATION', N'NOR', N'KIOSK_ENGLISH', 4378 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 14, N'Kiosk Spanish', 1, 14, N'Kiosk Spanish', 60000, NULL, 0, N'LOCATION', N'NOR', N'KIOSK_SPANISH', 4379 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 15, N'Merchant SVS English', 1, 15, N'Merchant SVS English', 60000, NULL, 0, N'LOCATION', N'NOR',
             N'MERCHANT_SVS_ENGLISH', 4381 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 16, N'Merchant SVS French', 1, 16, N'Merchant SVS French', 60000, NULL, 0, N'LOCATION', N'NOR',
             N'MERCHANT_SVS_FRENCH', 4382 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 17, N'Merchant SVS Spanish', 1, 17, N'Merchant SVS Spanish', 60000, NULL, 0, N'LOCATION', N'NOR',
             N'MERCHANT_SVS_SPANISH', 4383 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 18, N'PR Care - Spanish', 1, 56, N'PR Care - Spanish', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
             N'PR_CARE_SPANISH', 4367 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 19, N'Pre Pin Eng Queue', 1, 19, N'Pre Pin Eng Queue', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
             N'PRE_PIN_ENG_QUEUE', 4368 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 20, N'Pre Pin Spanish Queue', 1, 20, N'Pre Pin Spanish Queue', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
             N'PRE_PIN_SPANISH_QUEUE', 4369 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 21, N'Priority Care', 1, 21, N'Priority Care', 60000, N'See PreCare', 0, N'LOCATION', N'NOR', N'PRIORITY_CARE',
         4389 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 22, N'Priority Care - Spanish', 1, 22, N'Priority Care - Spanish', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
          N'PRIORITY_CARE_SPANISH', 4390 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 23, N'Terminal - Spanish', 1, 23, N'Terminal - Spanish', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
             N'TERMINAL_SPANISH', 4391 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 24, N'Terminal - Team', 1, 24, N'Terminal - Team', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
             N'TERMINAL_TEAM', 4392 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 25, N'Boost', 0, 25, N'Boost', 30000, NULL, 0, N'PRODUCT', N'JAX', N'BOOST_INACTIVE', 4416 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 26, N'Boost_Spanish', 0, 26, N'Boost_Spanish', 15000, NULL, 0, N'PRODUCT', N'JAX', N'BOOST_SPANISH_INACTIVE',
         4462 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 27, N'Discover', 0, 27, N'Discover', 30000, NULL, 0, N'PRODUCT', N'JAX', N'DISCOVER_INACTIVE', 4444 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 28, N'Discover_Spanish', 1, 28, N'Discover_Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX', N'DISCOVER_SPANISH',
         4440 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 29, N'JAX Care', 0, 29, N'JAX Care', 30000, NULL, 0, N'PRODUCT', N'JAX', N'JAX_CARE_INACTIVE', 4418 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 30, N'JAX Care - Spanish', 0, 30, N'JAX Care - Spanish', 30000, NULL, 0, N'PRODUCT', N'JAX',
             N'JAX_CARE_SPANISH_INACTIVE', 4428 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 31, N'LD', 0, 31, N'LD', 30000, NULL, 0, N'PRODUCT', N'JAX', N'LD_INACTIVE', 4429 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 32, N'LD - Spanish', 0, 32, N'LD - Spanish', 30000, NULL, 0, N'PRODUCT', N'JAX', N'LD_SPANISH_INACTIVE', 4430 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 33, N'Mastercard', 0, 33, N'Mastercard', 30000, NULL, 0, N'PRODUCT', N'JAX', N'MASTERCARD_INACTIVE', 4431 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 34, N'MasterCard_Spanish', 1, 34, N'MasterCard_Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX',
             N'MASTERCARD_SPANISH', 4348 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 35, N'MIO', 0, 35, N'MIO', 30000, NULL, 0, N'PRODUCT', N'JAX', N'MIO_INACTIVE', 4432 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 36, N'MIO - Spanish', 0, 36, N'MIO - Spanish', 30000, NULL, 0, N'PRODUCT', N'JAX', N'MIO_SPANISH_INACTIVE', 4433 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 37, N'Preposa', 0, 37, N'Preposa', 30000, NULL, 0, N'PRODUCT', N'JAX', N'PREPOSA_INACTIVE', 4434 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 38, N'Preposa Spanish', 1, 38, N'Preposa Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX', N'PREPOSA_SPANISH', 4355 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 39, N'SunPass', 0, 39, N'SunPass', 30000, NULL, 0, N'PRODUCT', N'JAX', N'SUNPASS_INACTIVE', 4419 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 40, N'SunPass Spanish', 1, 40, N'SunPass - Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX', N'SUNPASS_SPANISH',
         4358 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 41, N'Target Wrap Up', 0, 41, N'Target Wrap Up', 20000, NULL, 0, N'PRODUCT', N'JAX', N'TARGET_WRAP_UP_INACTIVE',
      4445 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 42, N'Target Spanish', 1, 42, N'Target Spanish', 20000, NULL, 1, N'PRODUCT', N'JAX', N'TARGET_SPANISH', 4465 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 43, N'VISA', 0, 43, N'VISA', 30000, NULL, 0, N'PRODUCT', N'JAX', N'VISA_INACTIVE', 4420 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 44, N'VISA_Spanish', 1, 44, N'VISA_Spanish', 16000, NULL, 1, N'PRODUCT', N'JAX', N'VISA_SPANISH', 4473 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 45, N'VRN', 0, 45, N'VRN', 30000, NULL, 0, N'PRODUCT', N'JAX', N'VRN', 4417 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 46, N'VRN - Spanish', 0, 46, N'VRN - Spanish', 30000, NULL, 0, N'PRODUCT', N'JAX', N'VRN_SPANISH_INACTIVE', 4421 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 47, N'Wireless', 0, 47, N'Wireless', 30000, NULL, 0, N'PRODUCT', N'JAX', N'WIRELESS_INACTIVE', 4422 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 48, N'Wireless_Spanish', 1, 48, N'Wireless_Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX', N'WIRELESS_SPANISH',
         4474 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 49, N'AirTime', 0, 49, N'AirTime', 30000, NULL, 0, N'LOCATION', N'NOR', N'AIRTIME_INACTIVE', 4479 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 50, N'Australia SVS', 1, 50, N'Australia SVS', 60000, NULL, 0, N'LOCATION', N'NOR', N'AUSTRALIA_SVS', 4365 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 51, N'Billing - Spanish', 1, 51, N'Billing - Spanish', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
             N'BILLING_SPANISH', 4407 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 52, N'Billing - Team', 0, 52, N'Billing - Team', 30000, NULL, 0, N'LOCATION', N'NOR', N'BILLING_TEAM_INACTIVE',
         4480 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 53, N'Gift Card', 0, 53, N'Gift Card', 30000, NULL, 0, N'LOCATION', N'NOR', N'GIFT_CARD_INACTIVE', 4481 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 54, N'Medagate English', 1, 54, N'Medagate English', 60000, NULL, 0, N'LOCATION', N'NOR', N'MEDAGATE_ENGLISH',
         4380 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 55, N'Medagate Spanish', 1, 55, N'Medagate Spanish', 60000, NULL, 0, N'LOCATION', N'NOR', N'MEDAGATE_SPANISH',
         4385 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 56, N'PR Care', 1, 56, N'PR Care', 60000, N'See PreCare', 0, N'LOCATION', N'NOR', N'PR_CARE', 4366 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 57, N'MetroPCS English Norcross', 1, 57, N'MetroPCS English Norcross', 60000, NULL, 0, N'LOCATION', N'NOR',
             N'METROPCS_ENGLISH_NORCROSS', 4384 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 58, N'MetroPCS Spanish Norcross', 1, 58, N'MetroPCS Spanish Norcross', 60000, NULL, 0, N'LOCATION', N'NOR',
             N'METROPCS_SPANISH_NORCROSS', 4386 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 59, N'Mexico VTS English', 1, 59, N'Mexico VTS English', 60000, NULL, 0, N'LOCATION', N'NOR',
             N'MEXICO_VTS_ENGLISH', 4387 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 60, N'Mexico VTS Spanish', 1, 60, N'Mexico VTS Spanish', 60000, NULL, 0, N'LOCATION', N'NOR',
             N'MEXICO_VTS_SPANISH', 4388 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 61, N'Training', 1, 61, N'Training', 60000, N'See PreCare', 0, N'LOCATION', N'NOR', N'TRAINING', 4393 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 62, N'Training - Spanish', 1, 62, N'Training - Spanish', 60000, N'See PreCare', 0, N'LOCATION', N'NOR',
             N'TRAINING_SPANISH', 4394 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 63, N'Training All', 1, 63, N'Training All', 60000, N'See PreCare', 0, N'LOCATION', N'NOR', N'TRAINING_ALL',
         4395 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 64, N'VTS English', 1, 64, N'VTS English', 60000, NULL, 0, N'LOCATION', N'NOR', N'VTS_ENGLISH', 4398 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 65, N'VTS Spanish', 1, 65, N'VTS Spanish', 60000, NULL, 0, N'LOCATION', N'NOR', N'VTS_SPANISH', 4400 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 66, N'VTS French', 1, 66, N'VTS French', 60000, NULL, 0, N'LOCATION', N'NOR', N'VTS_FRENCH', 4399 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 67, N'Vanilla Reload Network', 0, 67, N'Vanilla Reload Network', 30000, NULL, 0, N'PRODUCT', N'JAX',
             N'VANILLA_RELOAD_NETWORK_INACTIVE', 4423 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 68, N'PeachPass', 0, 68, N'PeachPass', 30000, NULL, 0, N'PRODUCT', N'JAX', N'PEACHPASS_INACTIVE', 4424 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 69, N'PayPal', 0, 69, N'PayPal', 30000, NULL, 0, N'PRODUCT', N'JAX', N'PAYPAL', 4426 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 71, N'General', 1, NULL, N'General', 30000, N' ', 0, N'PRODUCT', N'GLOBAL', N'GENERAL', 4449 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 74, N'Wireless_English', 1, 47, N'Wireless_English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'WIRELESS_ENGLISH',
         4472 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 79, N'Airtime', 1, 49, N'Airtime', 60000, NULL, 0, N'PRODUCT', N'NOR', N'AIRTIME', 4364 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 82, N'MIO_Existing_English', 0, 35, N'MIO_Existing_English', 15000, NULL, 0, N'PRODUCT', N'JAX',
             N'MIO_EXISTING_ENGLISH_INACTIVE', 4454 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 83, N'Vanilla Reload English', 1, 67, N'Vanilla Reload English', 15000, NULL, 0, N'PRODUCT', N'JAX',
             N'VANILLA_RELOAD_ENGLISH', 4450 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 89, N'Jax Activation', 1, 71, N'Jax Activation', 16000, NULL, 0, N'PRODUCT', N'JAX', N'JAX_ACTIVATION', 4477 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 90, N'PayPal English', 1, 69, N'PayPal English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'PAYPAL_ENGLISH', 4349 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 95, N'SunPass English', 1, 39, N'SunPass - English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'SUNPASS_ENGLISH',
         4357 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 96, N'VISA_English', 1, 43, N'VISA_English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'VISA_ENGLISH', 4466 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 97, N'Target English', 1, 41, N'Target English', 20000, NULL, 1, N'PRODUCT', N'JAX', N'TARGET_ENGLISH', 4446 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 100, N'My Vanilla Activations English', 0, 72, N'My Vanilla Activations English', 15000, NULL, 0, N'PRODUCT',
              N'JAX', N'MY_VANILLA_ACTIVATIONS_ENGLISH_INACTIVE', 4453 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 105, N'PeachPass English', 1, 68, N'PeachPass English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'PEACHPASS_ENGLISH',
      4351 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 106, N'Jax CARE', 1, 29, N'Jax CARE', 16000, NULL, 0, N'PRODUCT', N'JAX', N'JAX_CARE', 4441 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 110, N'GiftCard', 1, 53, N'GiftCard', 60000, NULL, 0, N'LOCATION', N'NOR', N'GIFTCARD', 4376 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 113, N'ICT French', 1, 74, N'ICT French', 60000, NULL, 0, N'LOCATION', N'NOR', N'ICT_FRENCH', 4411 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 114, N'LD CS English', 1, 31, N'LD CS English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'LD_CS_ENGLISH', 4478 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 115, N'Holiday Walgreens', 0, 70, N'Holiday Walgreens', 15000, NULL, 0, N'PRODUCT', N'JAX',
              N'HOLIDAY_WALGREENS_INACTIVE', 4452 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 119, N'WalMart Gas English', 0, 73, N'WalMart Gas English', 15000, NULL, 0, N'PRODUCT', N'JAX',
              N'WALMART_GAS_ENGLISH_INACTIVE', 4463 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 120, N'Boost_English', 0, 25, N'Boost_English', 15000, NULL, 0, N'PRODUCT', N'JAX', N'BOOST_ENGLISH_INACTIVE',
         4461 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 122, N'Billing -Team', 1, 52, N'Billing -Team', 60000, N'See PreCare', 0, N'LOCATION', N'NOR', N'BILLING_TEAM',
         4408 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 126, N'Discover_English', 1, 27, N'Discover_English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'DISCOVER_ENGLISH',
         4476 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 129, N'MasterCard_English', 1, 33, N'MasterCard_English', 16000, NULL, 0, N'PRODUCT', N'JAX',
              N'MASTERCARD_ENGLISH', 4347 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 130, N'Preposa English', 1, 37, N'Preposa English', 16000, NULL, 0, N'PRODUCT', N'JAX', N'PREPOSA_ENGLISH', 4353 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 133, N'CDPOSA_EN', 1, 75, N'CDPOSA_EN', 15000, NULL, 1, N'PRODUCT', N'RBC', N'CDPOSA_EN', 4468 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 134, N'CDPOSA_FR', 1, 76, N'CDPOSA_FR', 15000, NULL, 0, N'PRODUCT', N'RBC', N'CDPOSA_FR', 4470 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 135, N'VANILLA_MC', 1, 77, N'VANILLA_MC', 15000, NULL, 0, N'PRODUCT', N'RBC', N'VANILLA_MC', 4471 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 136, N'VANILLA_VISA', 1, 78, N'VANILLA_VISA', 15000, NULL, 1, N'PRODUCT', N'RBC', N'VANILLA_VISA', 4467 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 137, N'CCA_Queue', 1, NULL, N'CCA Queue', 15000, N'This is a test Queue for CCA development.', 0, N'PRODUCT',
              N'JAX', N'CCA_QUEUE', 4405 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 138, N'PeachPass Spanish', 1, 68, N'PeachPass Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX', N'PEACHPASS_SPANISH',
      4352 )
GO
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 139, N'Vanilla Reload Spanish', 1, 67, N'Vanilla Reload Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX',
              N'VANILLA_RELOAD_SPANISH', 4346 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 140, N'B2B Activation English', 1, 81, N'B2B Activation English', 16000, NULL, 0, N'PRODUCT', N'JAX',
              N'B2B_ACTIVATION_ENGLISH', 4435 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 141, N'B2B Activation Spanish', 1, NULL, N'B2B Activation Spanish', 16000, NULL, 0, N'PRODUCT', N'JAX',
              N'B2B_ACTIVATION_SPANISH', 4436 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 142, N'FINANCIALS_GPR', 1, NULL, N'FINANCIALS_GPR', 15000, NULL, 1, N'PRODUCT', N'RBC',
              N'FINANCIALS_GPR_INACTIVE', 4401 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 143, N'ZZZ', 0, NULL, N'ZZZ', 30000, NULL, 0, N'PRODUCT', N'GLOBAL', N'ZZZ_INACTIVE', 4402 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 144, N'VANILLA_MC_GC_FR', 1, 77, N'VANILLA_MC_GC_FR', 15000, NULL, 1, N'PRODUCT', N'RBC', N'VANILLA_MC_GC_FR',
         4403 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 145, N'VANILLA_VISA_GC_FR', 1, 78, N'VANILLA_VISA_GC_FR', 15000, NULL, 1, N'PRODUCT', N'RBC',
              N'VANILLA_VISA_GC_FR', 4447 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 146, N'Discover_RAN_English', 1, 76, N'Discover_RAN_English', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'DISCOVER_RAN_ENGLISH', 4438 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 147, N'Discover_RAN_Spanish', 1, NULL, N'Discover_RAN_Spanish', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'DISCOVER_RAN_SPANISH', 4439 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 148, N'PayPal Spanish', 1, 69, N'PayPal Spanish', 16000, NULL, 1, N'PRODUCT', N'JAX', N'PAYPAL_SPANISH', 4350 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 149, N'LD CS Spanish', 1, 31, N'LD CS Spanish', 16000, NULL, 1, N'PRODUCT', N'JAX', N'LD_CS_SPANISH', 4343 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 150, N'MIO_Existing_Spanish', 0, 35, N'MIO_Existing_Spanish', 15000, NULL, 1, N'PRODUCT', N'JAX',
              N'MIO_EXISTING_SPANISH_INACTIVE', 4443 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 151, N'My Vanilla Activations Spanish', 0, NULL, N'My Vanilla Activations Spanish', 15000, NULL, 0, N'PRODUCT',
              N'JAX', N'MY_VANILLA_ACTIVATIONS_SPANISH_INACTIVE', 4425 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 152, N'WalMart Gas Spanish', 0, NULL, N'WalMart Gas Spanish', 15000, NULL, 0, N'PRODUCT', N'JAX',
              N'WALMART_GAS_SPANISH_INACTIVE', 4464 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 153, N'Canada MasterCard English', 1, 107, N'Canada MasterCard English', 16000, NULL, 0, N'PRODUCT', N'JAX',
              N'CANADA_MASTERCARD_ENGLISH', 4437 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 154, N'Canada Visa English', 1, 109, N'Canada Visa English', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'CANADA_VISA_ENGLISH', 4475 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 155, N'Stripes English', 1, 89, N'Stripes English', 16000, NULL, 1, N'PRODUCT', N'JAX', N'STRIPES_ENGLISH', 4345 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 156, N'Stripes Spanish', 1, 89, N'Stripes Spanish', 16000, NULL, 1, N'PRODUCT', N'JAX', N'STRIPES_SPANISH', 4356 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 157, N'CDVRN_FR', 1, 113, N'CDVRN_FR', 15000, NULL, 1, N'PRODUCT', N'RBC', N'CDVRN_FR', 4406 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 158, N'GPR_FR_MY_VANILLA', 1, 104, N'GPR FR - MY VANILLA', 15000, NULL, 1, N'PRODUCT', N'RBC',
              N'GPR_FR_MY_VANILLA', 4448 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 159, N'GPR_FR_MY_VANILLA_ACT', 1, 107, N'GPR FR - MY VANILLA ACT', 15000, NULL, 1, N'PRODUCT', N'RBC',
              N'GPR_FR_MY_VANILLA_ACT', 4469 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 160, N'Rite Aid Fuel Reward English', 1, 103, N'Rite Aid Fuel Reward English', 16000, NULL, 1, N'PRODUCT', N'JAX',
           N'RITE_AID_FUEL_REWARD_ENGLISH', 4344 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 161, N'NextCALA English', 1, 85, N'NextCALA English', 30000, NULL, 1, N'CUSTOMER', N'JAX', N'NEXTCALA_ENGLISH',
         4404 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 162, N'NextCALA Spanish', 0, NULL, N'NextCALA Spanish', 30000, NULL, 0, N'PRODUCT', N'JAX',
              N'NEXTCALA_SPANISH_INACTIVE', 4442 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 163, N'NextCALA Activations English', 0, NULL, N'NextCALA Activations English', 30000, NULL, 0, N'PRODUCT',
              N'JAX', N'NEXTCALA_ACTIVATIONS_ENGLISH_INACTIVE', 4455 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 164, N'NextCALA Activations Spanish', 0, NULL, N'NextCALA Activations Spanish', 30000, NULL, 0, N'PRODUCT',
              N'JAX', N'NEXTCALA_ACTIVATIONS_SPANISH_INACTIVE', 4412 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 165, N'My Vanilla Canada GPR English', 0, NULL, N'My Vanilla Canada GPR English', 30000, NULL, 0, N'PRODUCT',
              N'JAX', N'MY_VANILLA_CANADA_GPR_ENGLISH_INACTIVE', 4456 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 166, N'My Vanilla Canada GPR Activations English', 0, NULL, N'My Vanilla Canada GPR Activations English', 30000,
           NULL, 0, N'PRODUCT', N'JAX', N'MY_VANILLA_CANADA_GPR_ACTIVATIONS_ENGLISH_INACTIVE', 4413 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 167, N'Jackson Hewitt English', 0, 97, N'Jackson Hewitt English', 30000, NULL, 1, N'PRODUCT', N'JAX',
              N'JACKSON_HEWITT_ENGLISH_INACTIVE', 4457 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 168, N'Jackson Hewitt Spanish', 0, NULL, N'Jackson Hewitt Spanish', 30000, NULL, 0, N'PRODUCT', N'JAX',
              N'JACKSON_HEWITT_SPANISH_INACTIVE', 4458 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 169, N'Jackson Hewitt Activations English', 0, NULL, N'Jackson Hewitt Activations English', 30000, NULL, 0,
              N'PRODUCT', N'JAX', N'JACKSON_HEWITT_ACTIVATIONS_ENGLISH_INACTIVE', 4414 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 170, N'Jackson Hewitt Activations Spanish', 0, NULL, N'Jackson Hewitt Activations Spanish', 30000, NULL, 0,
              N'PRODUCT', N'JAX', N'JACKSON_HEWITT_ACTIVATIONS_SPANISH_INACTIVE', 4415 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 171, N'Jackson Hewitt Franchise English', 0, NULL, N'Jackson Hewitt Franchise English', 30000, NULL, 0,
              N'PRODUCT', N'JAX', N'JACKSON_HEWITT_FRANCHISE_ENGLISH_INACTIVE', 4459 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 172, N'Jackson Hewitt Franchise Spanish', 0, NULL, N'Jackson Hewitt Franchise Spanish', 30000, NULL, 0,
              N'PRODUCT', N'JAX', N'JACKSON_HEWITT_FRANCHISE_SPANISH_INACTIVE', 4460 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 173, N'Virtual Vanilla English', 1, NULL, N'Virtual Vanilla English', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'VIRTUAL_VANILLA_ENGLISH', 4359 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 174, N'Virtual Vanilla Spanish', 1, NULL, N'Virtual Vanilla Spanish', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'VIRTUAL_VANILLA_SPANISH', 4360 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 175, N'Jax Canada VRN English', 1, 105, N'Jax Canada VRN English', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'JAX_CANADA_VRN_ENGLISH', 4354 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 176, N'IVR', 1, NULL, N'IVR', 30000, NULL, 0, N'PRODUCT', N'SYSTEM', N'IVR', 4451 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 177, N'Healthcare Rewards English', 1, 99, N'Healthcare Rewards English', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'HEALTHCARE_REWARDS_ENGLISH', 4361 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 178, N'Healthcare Rewards Spanish', 1, 99, N'Healthcare Rewards Spanish', 16000, NULL, 1, N'PRODUCT', N'JAX',
              N'HEALTHCARE_REWARDS_SPANISH', 4362 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 180, N'IDS Loyalty English', 1, 101, N'IDS Loyalty English', 30000, NULL, 1, N'PRODUCT', N'JAX',
              N'IDS_LOYALTY_ENGLISH', 4483 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 181, N'IDS Loyalty Spanish', 1, 101, N'IDS Loyalty Spanish', 30000, NULL, 1, N'PRODUCT', N'JAX',
              N'IDS_LOYALTY_SPANISH', 4484 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 182, N'U Fan English', 1, 91, N'U Fan English', 30000, NULL, 1, N'PRODUCT', N'JAX', N'U_FAN_ENGLISH', 4485 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 183, N'U Fan Spanish', 1, 91, N'U Fan Spanish', 30000, NULL, 1, N'PRODUCT', N'JAX', N'U_FAN_SPANISH', 4486 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 184, N'Rite Aid Olympic Rewards English', 1, 0, N'Rite Aid Olympic Rewards English', 15000, NULL, 1, N'PRODUCT',
           N'JAX', N'RITE_AID_OLYMPIC_REWARDS_ENGLISH', 4488 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 195, N'FRD_BAD_CREDIT_1', 1, NULL, N'Bad Credit 1 (<$10)', 30000, NULL, 0, N'NONE', N'FRAUD', N'FRD_BAD_CREDIT_1',
      4543 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 196, N'FRD_BAD_CREDIT_2', 1, NULL, N'Bad Credit 2', 30000, NULL, 0, N'NONE', N'FRAUD', N'FRD_BAD_CREDIT_2', 4544 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 197, N'FRD_BAD_CREDIT_3', 1, NULL, N'Bad Credit 3', 30000, NULL, 0, N'NONE', N'FRAUD', N'FRD_BAD_CREDIT_3', 4545 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 198, N'FRD_BAD_CREDIT_4', 1, NULL, N'Bad Credit 4', 30000, NULL, 0, N'NONE', N'FRAUD', N'FRD_BAD_CREDIT_4', 4546 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 199, N'FRD_GIFT_INACTIVE', 1, NULL, N'Gift Inactive', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_GIFT_INACTIVE', 4547 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 200, N'FRD_REPLACEMENT_CARD_ACTIVATION', 1, NULL, N'Replacement Card Activation', 30000, NULL, 0, N'NONE',
              N'FRAUD', N'QUEUE_FRD_REPLACEMENT_CARD_ACTIVATION', 4548 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 201, N'FRD_WALMART_COM', 1, NULL, N'Walmart.com', 30000, NULL, 0, N'NONE', N'FRAUD', N'QUEUE_FRD_WALMART_COM',
         4549 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 202, N'FRD_GPR_INACTIVE', 1, NULL, N'GPR Inactive', 30000, NULL, 0, N'NONE', N'FRAUD', N'QUEUE_FRD_GPR_INACTIVE',
      4550 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 203, N'FRD_VRN_INACTIVE', 1, NULL, N'VRN Inactive', 30000, NULL, 0, N'NONE', N'FRAUD', N'QUEUE_FRD_VRN_INACTIVE',
      4551 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 204, N'FRD_PAYPAL_INACTIVE', 1, NULL, N'PayPal Inactive', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_PAYPAL_INACTIVE', 4552 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 205, N'FRD_CANADA_DISPUTE', 1, NULL, N'Canada Dispute', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_CANADA_DISPUTE', 4553 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 206, N'FRD_GIFTCARD_DISPUTE', 1, NULL, N'Giftcard Dispute', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_GIFTCARD_DISPUTE', 4554 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 207, N'FRD_PAYPAL_DISPUTE', 1, NULL, N'PayPal Dispute', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_PAYPAL_DISPUTE', 4555 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 208, N'FRD_GPR_DISPUTE_FORM', 1, NULL, N'GPR Dispute Form', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_GPR_DISPUTE_FORM', 4556 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 209, N'FRD_GPR_DISPUTE', 1, NULL, N'GPR Dispute', 30000, NULL, 0, N'NONE', N'FRAUD', N'QUEUE_FRD_GPR_DISPUTE',
         4557 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 210, N'FRD_VRN_DISPUTE', 1, NULL, N'VRN Dispute', 30000, NULL, 0, N'NONE', N'FRAUD', N'QUEUE_FRD_VRN_DISPUTE',
         4558 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 211, N'FRD_DISCOVER_CHARGEBACK', 1, NULL, N'Discover Chargeback', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_DISCOVER_CHARGEBACK', 4559 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 212, N'FRD_MC_CHARGEBACK', 1, NULL, N'MC Chargeback', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_MC_CHARGEBACK', 4560 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 213, N'FRD_VISA_CHARGEBACK', 1, NULL, N'VISA Chargeback', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_VISA_CHARGEBACK', 4561 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 214, N'FRD_LAW_ENFORCEMENT', 1, NULL, N'Law Enforcement', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_LAW_ENFORCEMENT', 4562 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 215, N'FRD_VRN_DAMAGED_PINS', 1, NULL, N'VRN Damaged Pins', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_VRN_DAMAGED_PINS', 4563 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 216, N'FRD_PAYPAL_DAMAGED_PINS', 1, NULL, N'PayPal Damaged Pins', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_PAYPAL_DAMAGED_PINS', 4564 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 217, N'FRD_PAYPAL_REDEMPTION_ISSUE', 1, NULL, N'PayPal Redemption Issue', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_PAYPAL_REDEMPTION_ISSUE', 4565 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES
    ( 218, N'FRD_REPLACEMENT_CARD_REQUESTS', 1, NULL, N'Replacement Card Requests', 30000, NULL, 0, N'NONE', N'FRAUD',
           N'QUEUE_FRD_REPLACEMENT_CARD_REQUESTS', 4566 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 219, N'FRD_MERCHANT_FRAUD', 1, NULL, N'Merchant Fraud', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_MERCHANT_FRAUD', 4567 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 220, N'FRD_LOST_CARD', 1, NULL, N'Lost Card', 30000, NULL, 0, N'NONE', N'FRAUD', N'QUEUE_FRD_LOST_CARD', 4568 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 221, N'FRD_MY_VANILLA_CANCELLATION', 1, NULL, N'My Vanilla Cancellation', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_MY_VANILLA_CANCELLATION', 4569 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 222, N'FRD_PAYPAL_REFUNDS', 1, NULL, N'PayPal Refunds', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_PAYPAL_REFUNDS', 4570 )
INSERT [dbo].[session_queue] ([id], [i3_name], [active], [robohelp_id], [display_name], [autowrap_time], [default_note], [autoclose], [type], [locale], [system_name], [permission_id])
VALUES ( 223, N'FRD_MONTHLY_FEE_CREDIT', 1, NULL, N'Monthly Fee Credit', 30000, NULL, 0, N'NONE', N'FRAUD',
              N'QUEUE_FRD_MONTHLY_FEE_CREDIT', 4571 )
SET IDENTITY_INSERT [dbo].[session_queue] OFF
SET IDENTITY_INSERT [dbo].[session_queue_session_type] ON

INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 3, 0, N'LEGACY' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 4, 1, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 5, 2, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 6, 3, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 7, 4, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 8, 5, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 9, 6, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 10, 7, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 11, 8, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 12, 9, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 13, 10, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 14, 11, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 15, 12, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 16, 13, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 17, 14, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 18, 15, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 19, 16, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 20, 17, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 21, 18, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 22, 19, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 23, 20, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 24, 21, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 25, 22, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 26, 23, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 27, 24, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 28, 25, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 29, 26, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 30, 27, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 31, 28, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 32, 29, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 33, 30, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 34, 31, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 35, 32, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 36, 33, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 37, 34, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 38, 35, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 39, 36, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 40, 37, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 41, 38, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 42, 39, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 43, 40, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 44, 41, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 45, 42, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 46, 43, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 47, 44, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 48, 45, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 49, 46, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 50, 47, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 51, 48, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 52, 49, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 53, 50, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 54, 51, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 55, 52, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 56, 53, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 57, 54, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 58, 55, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 59, 56, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 60, 57, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 61, 58, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 62, 59, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 63, 60, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 64, 61, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 65, 62, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 66, 63, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 67, 64, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 68, 65, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 69, 66, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 70, 67, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 71, 68, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 72, 69, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 1, 71, N'GENERAL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 73, 74, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 74, 79, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 75, 82, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 76, 83, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 77, 89, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 78, 90, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 79, 95, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 80, 96, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 81, 97, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 82, 100, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 83, 105, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 84, 106, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 85, 110, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 86, 113, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 87, 114, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 88, 115, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 89, 119, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 90, 120, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 91, 122, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 92, 126, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 93, 129, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 94, 130, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 95, 133, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 96, 134, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 97, 135, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 98, 136, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 99, 137, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 100, 138, N'CALL' )
GO
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 101, 139, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 102, 140, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 103, 141, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 104, 142, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 105, 144, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 106, 145, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 107, 146, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 108, 147, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 109, 148, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 110, 149, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 111, 150, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 112, 151, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 113, 152, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 114, 153, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 115, 154, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 116, 155, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 117, 156, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 118, 157, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 119, 158, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 120, 159, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 121, 160, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 122, 161, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 123, 162, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 124, 163, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 125, 164, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 126, 165, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 127, 166, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 128, 167, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 129, 168, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 130, 169, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 131, 170, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 132, 171, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 133, 172, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 134, 173, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 135, 174, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 136, 175, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 2, 176, N'SYSTEM' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 137, 177, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 138, 178, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 139, 180, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 140, 181, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 141, 182, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 142, 183, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 143, 184, N'CALL' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 154, 195, N'BAD_CREDIT' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 155, 196, N'BAD_CREDIT' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 156, 197, N'BAD_CREDIT' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 157, 198, N'BAD_CREDIT' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 158, 199, N'CONSUMED_CARD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 159, 200, N'CONSUMED_CARD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 160, 201, N'CONSUMED_CARD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 161, 202, N'CONSUMED_CARD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 162, 203, N'CONSUMED_CARD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 163, 204, N'CONSUMED_CARD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 164, 205, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 165, 206, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 166, 207, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 167, 208, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 168, 209, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 169, 210, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 170, 211, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 171, 212, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 172, 213, N'DISPUTE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 173, 214, N'LAW_ENFORCEMENT' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 174, 215, N'DAMAGED_PINS' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 178, 215, N'OTHER_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 175, 216, N'DAMAGED_PINS' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 179, 216, N'OTHER_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 180, 217, N'OTHER_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 176, 217, N'PAYPAL_REDEMPTION_ISSUE' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 181, 218, N'OTHER_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type])
VALUES ( 177, 219, N'MERCHANT_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 182, 220, N'OTHER_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 183, 221, N'OTHER_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 184, 222, N'OTHER_FRAUD' )
INSERT [dbo].[session_queue_session_type] ([id], [session_queue_id], [session_type]) VALUES ( 185, 223, N'OTHER_FRAUD' )
SET IDENTITY_INSERT [dbo].[session_queue_session_type] OFF
SET IDENTITY_INSERT [dbo].[short_pay] ON

INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 12, N'4819', N'Best Buy Canada', N'332627', N'BBCCREDTLOC', N'2555110', N'BBYCBBC01162011' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 16, N'6927', N'Costco', N'269386', N'CostcoCredLoc', N'2280557', N'A6927Costco05122' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 20, N'6737', N'Dollar General', N'382199', N'DGCREDLOC', N'3379325', N'DGNDG08102012' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 24, N'12709', N'Frys Electronics', N'407304', N'FRYSCREDLOC', N'5643610', N'FRYSFRYS0001' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 28, N'6368', N'HEB', N'266056', N'HEBCREDLOC', N'2261039', N'HEBHEB01082010' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 32, N'5867', N'Hastings Entertainment', N'238884', N'HECreditLocation', N'2106824', N'HSTHE7212009' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 36, N'5724', N'Jean Coutu', N'266060', N'JCTCREDLOC', N'2261044', N'JCTJCT01082010' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 40, N'12589', N'Longos', N'333433', N'LNGCREDLOC', N'2563676', N'longLNG01312011' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 44, N'9810', N'Meijer C-Stores', N'576912', N'MeijerCStoresCREDLOC', N'5639724', N'MEICMEICMEICMEIS' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 48, N'6658', N'Meijer Superstore', N'576911', N'MeijerSuperstoreCREDLOC', N'5122852', N'MEIS20130910' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 52, N'6564', N'Office Depot', N'282284', N'ODPCREDLOC', N'3797286', N'DEPDEPDEPODP0301' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 64, N'3055', N'Rite Aid', N'266235', N'RAIDCREDLOC', N'2261859', N'RAI01082010' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 68, N'4958', N'Shoppers Drug Mart', N'267339', N'SDMCREDLOC', N'5437717', N'397400' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 72, N'2355', N'Speedway SSA', N'266239', N'SSACREDLOC', N'3785279', N'SPWSSPWSSSA01082' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 76, N'3797', N'7 Eleven', N'332658', N'SVECREDLOC', N'2555543', N'SVLNSVE01072011' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 80, N'3255', N'United Dairy Farmers', N'268469', N'UDFCREDLOC', N'2274498', N'UDFUDF03122010' )
INSERT [dbo].[short_pay] ([id], [merchant_id], [merchant_name], [location_id], [location_name], [terminal_id], [terminal_number])
VALUES ( 84, N'6489', N'Walgreens', N'266251', N'WAGCREDLOC', N'2261879', N'WAGWAG01082010' )
SET IDENTITY_INSERT [dbo].[short_pay] OFF
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'ACCOUNTHISTORY', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'ACTIVESESSIONSWIDGET', 0, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'ALLOWADJUSTBALANCEWHENINITIAL', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'APLSLOGGING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'AUTOROLEASSIGNMENT', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'AUTOWRAPTIMER', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'BULKDEACTIVATIONSERVICESPAGE', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'CONTROLNUMBERSEARCH', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'EXPORTCSV', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'EXPORTEXCEL', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'EXPORTGREENCARD', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCACTIONACTIVATEB2BCARD', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCACTIONACTIVATEGIFTCARDREPLACEMENT', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCACTIONBALANCEADJUSTMENT', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCACTIONCHANGESTATUS', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCACTIONPREAUTHRELEASE', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCACTIONREPLACECARD', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCREQUESTRESPONSEMAPPING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GCSTATUSMAPPING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'GOOGLEANALYTICS', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'I3HANDLING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'I3RETRYDISCONNECT', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'I3UI', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'I3WRAPUPSENDDELAY', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'IVRHANDLING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'JIRAREPORTING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'LIVETROUBLESHOOTING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'MMOPCODEMAPPING', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'MULTIPACKWRAPPERSERIALNUMBERLINK', 0, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'ORDERID', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'PASSTHROUGH', 0, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'PROMOCODE', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'PROXYIDSEARCH', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'REVERSEVRNSEARCH', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'REVERSEVRNSEARCHBYCONTROLNUMBER', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'ROLESPERMISSIONSADMINMOCK', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'SHOWRAWVENDORSTATUS', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'TABLEAU_TICKET', 0, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'TRANSACTIONSUMMARY', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'UPDATEGREENCARDNOTE', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'VMSIVRSUPPORT', 1, NULL, NULL )
INSERT [dbo].[togglz] ([feature_name], [feature_enabled], [strategy_id], [strategy_params])
VALUES ( N'WEBSOCKETRECONNECTTIMER', 0, NULL, NULL )
SET IDENTITY_INSERT [dbo].[wizard_message] ON

INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 1, N'RAISE_CASE', N'TITLE', 1, N'Raise Case', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 2, N'RAISE_CASE', N'SHORT_TITLE', 1, N'Case', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 3, N'RAISE_CASE', N'HEADER', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 4, N'RAISE_CASE', N'SUBHEADER', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 5, N'RAISE_CASE', N'INSTRUCTIONS', 1, N'<div>1. Complete the form below.</div>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 6, N'RAISE_CASE', N'ALERT', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 7, N'RAISE_CASE', N'FOOTER', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 8, N'RAISE_CASE', N'TITLE', 2, N'Raise Case', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 9, N'RAISE_CASE', N'SHORT_TITLE', 2, N'Customer', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 10, N'RAISE_CASE', N'HEADER', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 11, N'RAISE_CASE', N'SUBHEADER', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 12, N'RAISE_CASE', N'INSTRUCTIONS', 2, N'<div>
                                                                <div>1. Select the correct customer record from the options below.</div>
                                                                <div>2. Complete any missing information in the form below.</div>
                                                            </div>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 13, N'RAISE_CASE', N'ALERT', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 14, N'RAISE_CASE', N'FOOTER', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 15, N'RAISE_CASE', N'TITLE', 3, N'Raise Case', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 16, N'RAISE_CASE', N'SHORT_TITLE', 3, N'Merchant', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 17, N'RAISE_CASE', N'HEADER', 3, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 18, N'RAISE_CASE', N'SUBHEADER', 3, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 19, N'RAISE_CASE', N'INSTRUCTIONS', 3, N'<div>
                                                                <div>1. Select the correct merchant record from the options below.</div>
                                                                <div>2. Complete any missing information in the form below.</div>
                                                            </div>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 20, N'RAISE_CASE', N'ALERT', 3, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 21, N'RAISE_CASE', N'FOOTER', 3, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 22, N'RAISE_CASE', N'TITLE', 4, N'Raise Case', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 23, N'RAISE_CASE', N'SHORT_TITLE', 4, N'Receipt', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 24, N'RAISE_CASE', N'HEADER', 4, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 25, N'RAISE_CASE', N'SUBHEADER', 4, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 26, N'RAISE_CASE', N'INSTRUCTIONS', 4, N'<div>1. Complete the form below.</div>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 27, N'RAISE_CASE', N'ALERT', 4, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 28, N'RAISE_CASE', N'FOOTER', 4, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 29, N'RAISE_CASE', N'TITLE', 5, N'Raise Case', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 30, N'RAISE_CASE', N'SHORT_TITLE', 5, N'Confirm', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 31, N'RAISE_CASE', N'HEADER', 5, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 32, N'RAISE_CASE', N'SUBHEADER', 5, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 33, N'RAISE_CASE', N'INSTRUCTIONS', 5, N'<div>1. Review the information below before proceeding.</div>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 34, N'RAISE_CASE', N'ALERT', 5, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 35, N'RAISE_CASE', N'FOOTER', 5, N'<strong>Are you sure you want to raise this Case?</strong>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 36, N'RAISE_CASE', N'TITLE', 6, N'Raise Case', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 37, N'RAISE_CASE', N'SHORT_TITLE', 6, N'Results', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 38, N'RAISE_CASE', N'HEADER', 6, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 39, N'RAISE_CASE', N'SUBHEADER', 6, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message]) VALUES
    ( 40, N'RAISE_CASE', N'INSTRUCTIONS', 6, N'<div>The Case was raised successfully.</div>',
      N'<div>An unexpected error occurred while raising the Case. Please try again, or contact a System Administrator for assistance.</div>' )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 41, N'RAISE_CASE', N'ALERT', 6, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 42, N'RAISE_CASE', N'FOOTER', 6, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 43, N'MERGE_SELECTION', N'TITLE', 1, N'Merge Selection Information', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 44, N'MERGE_SELECTION', N'SHORT_TITLE', 1, N'Select', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 45, N'MERGE_SELECTION', N'HEADER', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 46, N'MERGE_SELECTION', N'SUBHEADER', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message]) VALUES
    ( 47, N'MERGE_SELECTION', N'INSTRUCTIONS', 1,
      N'<div>1. Select the Case Component to merge this Selection into.</div>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 48, N'MERGE_SELECTION', N'ALERT', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 49, N'MERGE_SELECTION', N'FOOTER', 1, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 50, N'MERGE_SELECTION', N'TITLE', 2, N'Merge Selection Information', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 51, N'MERGE_SELECTION', N'SHORT_TITLE', 2, N'Merge', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 52, N'MERGE_SELECTION', N'HEADER', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 53, N'MERGE_SELECTION', N'SUBHEADER', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message]) VALUES
    ( 54, N'MERGE_SELECTION', N'INSTRUCTIONS', 2,
      N'<div>1. Move Selection information from the left into the Case Component on the right as needed.</div>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 55, N'MERGE_SELECTION', N'ALERT', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 56, N'MERGE_SELECTION', N'FOOTER', 2, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 57, N'MERGE_SELECTION', N'TITLE', 3, N'Merge Selection Information', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 58, N'MERGE_SELECTION', N'SHORT_TITLE', 3, N'Confirm', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 59, N'MERGE_SELECTION', N'HEADER', 3, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 60, N'MERGE_SELECTION', N'SUBHEADER', 3, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message]) VALUES
    ( 61, N'MERGE_SELECTION', N'INSTRUCTIONS', 3, N'<div>1. Review the information below before proceeding.</div>',
      NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 62, N'MERGE_SELECTION', N'ALERT', 3, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message]) VALUES
    ( 63, N'MERGE_SELECTION', N'FOOTER', 3, N'<strong>Are you sure you want to merge this information?</strong>', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 64, N'MERGE_SELECTION', N'TITLE', 4, N'Merge Selection Information', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 65, N'MERGE_SELECTION', N'SHORT_TITLE', 4, N'Results', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 66, N'MERGE_SELECTION', N'HEADER', 4, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 67, N'MERGE_SELECTION', N'SUBHEADER', 4, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message]) VALUES
    ( 68, N'MERGE_SELECTION', N'INSTRUCTIONS', 4,
      N'<div>The Selection information was merged into the Case Component successfully.</div>',
      N'<div>An unexpected error occurred while merging the Selection. Please try again, or contact a System Administrator for assistance.</div>' )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 69, N'MERGE_SELECTION', N'ALERT', 4, N'', NULL )
INSERT [dbo].[wizard_message] ([id], [wizard_key], [message_type], [page], [message], [failure_message])
VALUES ( 70, N'MERGE_SELECTION', N'FOOTER', 4, N'', NULL )
SET IDENTITY_INSERT [dbo].[wizard_message] OFF
SET IDENTITY_INSERT [dbo].[wrap_up_code] ON

INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 0, N'Not Wrapped - Legacy', 0, 0, N'Not Wrapped - Legacy', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 9, N'50-6 CCA Research', 12, 1, N'Research', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 10, N'180-7 ICT Card Status/Balance Inquiry', 6, 1, N'ICT Card Status/Balance Inquiry (180-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 11, N'180-4 ICT Fraud', 6, 1, N'ICT Fraud (180-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 12, N'180-8 ICT Unlock Terminal', 6, 1, N'ICT Unlock Terminal (180-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 13, N'180-5 ICT Add/Delete User', 6, 1, N'ICT Add/Delete User (180-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 14, N'180-1 ICT Assistance Deactivating FastPin', 6, 1, N'ICT Assistance Deactivating FastPin (180-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 15, N'180-6 ICT Product Activation Issue', 6, 1, N'ICT Product Activation Issue (180-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 16, N'180-3 ICT Accounting/Billing-Invoice Issue', 6, 1, N'ICT Accounting/Billing-Invoice Issue (180-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 17, N'180-2 ICT Terminal Issue', 6, 1, N'ICT Terminal Issue (180-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 18, N'140-8 EPay Pin Status Verification', 11, 1, N'EPay Pin Status Verification (140-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 19, N'140-2 EPay Credit-Void', 11, 1, N'EPay Credit-Void (140-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 20, N'140-9 EPay Pin Needed', 11, 1, N'EPay Pin Needed (140-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 21, N'50-1 Fraud', 12, 1, N'Fraud (50-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 22, N'40-1 Card Status Inquiry', 8, 1, N'Card Status Inquiry (40-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 23, N'40-2 Card Activation Issue', 8, 1, N'Card Activation Issue (40-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 24, N'140-4 EPay Product Order-Issue', 11, 1, N'EPay Product Order-Issue (140-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 25, N'140-1 EPay Acct-Invoice-Billing Request', 11, 1, N'EPay Acct-Invoice-Billing Request (140-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 26, N'140-6 EPay Account Disabled-Terminal Lockout', 11, 1, N'EPay Account Disabled-Terminal Lockout (140-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 27, N'140-3 EPay Fraud', 11, 1, N'EPay Fraud (140-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 28, N'140-7 EPay Store Value Gift Card Balance Inquiry', 11, 1,
      N'EPay Store Value Gift Card Balance Inquiry (140-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 29, N'80-1 Sales Lead - Potential Merchant', 10, 1, N'Sales Lead - Potential Merchant (80-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 30, N'70-1 Product Order-Warehouse', 9, 1, N'Product Order-Warehouse (70-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 31, N'150-2 Circle K Certegy-EBT Software Issue', 7, 1, N'Circle K Certegy-EBT Software Issue (150-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 32, N'150-1 Circle K InComm Software Issue', 7, 1, N'Circle K InComm Software Issue (150-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 33, N'40-3 Financial Card Credit Request', 8, 1, N'Financial Card Credit Request (40-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 34, N'140-5 EPay Terminal Issue', 11, 1, N'EPay Terminal Issue (140-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 35, N'838-3 (VIRGIN) CARRIER ISSUE', 25, 1, N'(VIRGIN) CARRIER ISSUE (838-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 36, N'833-3 (ALLTEL) CARRIER ISSUE', 31, 1, N'(ALLTEL) CARRIER ISSUE (833-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 37, N'836-4 (TRACFONE) CARRIER PIN STATUS REQUEST', 32, 1, N'(TRACFONE) CARRIER PIN STATUS REQUEST (836-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 38, N'837-1 (US CELLULAR) REDEMPTION', 26, 1, N'(US CELLULAR) REDEMPTION (837-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 39, N'837-2 (US CELLULAR) ALREADY REDEEMED', 26, 1, N'(US CELLULAR) ALREADY REDEEMED (837-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 40, N'835-1 (TMOBILE) REDEMPTION', 33, 1, N'(TMOBILE) REDEMPTION (835-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 41, N'830-4 (AT&T) *888', 13, 1, N'(AT&T) *888 (830-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 42, N'820-1 (LYCO) REDEMPTION', 30, 1, N'(LYCO) REDEMPTION (820-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 43, N'830-3 (AT&T) CARRIER ISSUE', 13, 1, N'(AT&T) CARRIER ISSUE (830-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 44, N'839-3 (BUZZ) CARRIER ISSUE', 27, 1, N'(BUZZ) CARRIER ISSUE (839-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 45, N'829-1 (O2) REDEMPTION', 21, 1, N'(O2) REDEMPTION (829-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 46, N'824-1 (TRUMPET) REDEMPTION', 14, 1, N'(TRUMPET) REDEMPTION (824-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 47, N'820-2 (LYCO) ALREADY REDEEMED', 30, 1, N'(LYCO) ALREADY REDEEMED (820-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 48, N'823-3 (ZTAR) CARRIER ISSUE', 19, 1, N'(ZTAR) CARRIER ISSUE (823-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 49, N'825-1 (STI) REDEMPTION', 15, 1, N'(STI) REDEMPTION (825-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 50, N'832-3 (CRICKET) CARRIER ISSUE', 17, 1, N'(CRICKET) CARRIER ISSUE (832-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 51, N'822-4 (READY) CARRIER PIN STATUS REQUEST', 16, 1, N'(READY) CARRIER PIN STATUS REQUEST (822-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 52, N'832-1 (CRICKET) REDEMPTION', 17, 1, N'(CRICKET) REDEMPTION (832-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 53, N'825-4 (STI) CARRIER PIN STATUS REQUEST', 15, 1, N'(STI) CARRIER PIN STATUS REQUEST (825-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 54, N'831-4 (CLARO) CARRIER PIN STATUS REQUEST', 18, 1, N'(CLARO) CARRIER PIN STATUS REQUEST (831-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 55, N'835-2 (TMOBILE) ALREADY REDEEMED', 33, 1, N'(TMOBILE) ALREADY REDEEMED (835-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 56, N'825-3 (STI) CARRIER ISSUE', 15, 1, N'(STI) CARRIER ISSUE (825-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 57, N'822-2 (READY) ALREADY REDEEMED', 16, 1, N'(READY) ALREADY REDEEMED (822-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 58, N'824-2 (TRUMPET) ALREADY REDEEMED', 14, 1, N'(TRUMPET) ALREADY REDEEMED (824-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 59, N'826-3 (MOVIDA) CARRIER ISSUE', 22, 1, N'(MOVIDA) CARRIER ISSUE (826-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 60, N'834-3 (IWIRELESS) CARRIER ISSUE', 29, 1, N'(IWIRELESS) CARRIER ISSUE (834-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 61, N'826-1 (MOVIDA) ALREADY REDEEMED', 22, 1, N'(MOVIDA) ALREADY REDEEMED (826-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 62, N'828-4 (NET10) CARRIER PIN STATUS REQUEST', 20, 1, N'(NET10) CARRIER PIN STATUS REQUEST (828-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 63, N'823-1 (ZTAR) REDEMPTION', 19, 1, N'(ZTAR) REDEMPTION (823-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 64, N'923-1 DEAD AIR', 28, 1, N'DEAD AIR (923-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 65, N'834-4 (TMOBILE) CARRIER PIN STATUS REQUEST', 29, 1, N'(TMOBILE) CARRIER PIN STATUS REQUEST (834-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 66, N'834-2 (IWIRELESS) ALREADY REDEEMED', 29, 1, N'(IWIRELESS) ALREADY REDEEMED (834-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 67, N'827-4 (AIRLINK) CARRIER PIN STATUS REQUEST', 23, 1, N'(AIRLINK) CARRIER PIN STATUS REQUEST (827-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 68, N'839-2 (BUZZ) ALREADY REDEEMED', 27, 1, N'(BUZZ) ALREADY REDEEMED (839-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 69, N'826-4 (MOVIDA) CARRIER PIN STATUS REQUEST', 22, 1, N'(MOVIDA) CARRIER PIN STATUS REQUEST (826-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 70, N'832-4 (CRICKET) CARRIER PIN STATUS REQUEST', 17, 1, N'(CRICKET) CARRIER PIN STATUS REQUEST (832-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 71, N'831-3 (CLARO) CARRIER ISSUE', 18, 1, N'(CLARO) CARRIER ISSUE (831-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 72, N'823-2 (ZTAR) ALREADY REDEEMED', 19, 1, N'(ZTAR) ALREADY REDEEMED (823-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 73, N'828-2 (NET10) ALREADY REDEEMED', 20, 1, N'(NET10) ALREADY REDEEMED (828-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 74, N'827-3 (AIRLINK) CARRIER ISSUE', 23, 1, N'(AIRLINK) CARRIER ISSUE (827-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 75, N'914-1 MERCHANT CALLED', 24, 1, N'MERCHANT CALLED (914-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 76, N'830-2 (AT&T) ALREADY REDEEMED', 13, 1, N'(AT&T) ALREADY REDEEMED (830-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 77, N'831-2 (CLARO) ALREADY REDEEMED', 18, 1, N'(CLARO) ALREADY REDEEMED (831-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 78, N'838-4 (VIRGIN) CARRIER PIN STATUS REQUEST', 25, 1, N'(VIRGIN) CARRIER PIN STATUS REQUEST (838-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 79, N'824-4 (TRUMPET) CARRIER PIN STATUS REQUEST', 14, 1, N'(TRUMPET) CARRIER PIN STATUS REQUEST (824-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 80, N'828-3 (NET10) CARRIER ISSUE', 20, 1, N'(NET10) CARRIER ISSUE (828-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 81, N'836-3 (TRACFONE) CARRIER ISSUE', 32, 1, N'(TRACFONE) CARRIER ISSUE (836-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 82, N'833-2 (ALLTEL) ALREADY REDEEMED', 31, 1, N'(ALLTEL) ALREADY REDEEMED (833-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 83, N'823-4 (ZTAR) CARRIER PIN STATUS REQUEST', 19, 1, N'(ZTAR) CARRIER PIN STATUS REQUEST (823-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 84, N'830-5 (AT&T WHPP) REDEMPTION', 13, 1, N'(AT&T WHPP) REDEMPTION (830-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 85, N'830-7 (AT&T WHPP) CARRIER ISSUE', 13, 1, N'(AT&T WHPP) CARRIER ISSUE (830-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 86, N'837-3 (US CELLULAR) CARRIER ISSUE', 26, 1, N'(US CELLULAR) CARRIER ISSUE (837-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 87, N'839-1 (BUZZ) REDEMPTION', 27, 1, N'(BUZZ) REDEMPTION (839-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 88, N'829-3 (O2) CARRIER ISSUE', 21, 1, N'(O2) CARRIER ISSUE (829-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 89, N'914-2 RETURN TO MERCHANT WITH RECEIPT', 24, 1, N'RETURN TO MERCHANT WITH RECEIPT (914-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 90, N'824-3 (TRUMPET) CARRIER ISSUE', 14, 1, N'(TRUMPET) CARRIER ISSUE (824-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 91, N'828-1 (NET10) REDEMPTION', 20, 1, N'(NET10) REDEMPTION (828-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 92, N'820-3 (LYCO) CARRIER ISSUE', 30, 1, N'(LYCO) CARRIER ISSUE (820-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 93, N'827-2 (AIRLINK) ALREADY REDEEMED', 23, 1, N'(AIRLINK) ALREADY REDEEMED (827-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 94, N'834-1 (IWIRELESS) REDEMPTION', 29, 1, N'(IWIRELESS) REDEMPTION (834-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 95, N'833-1 (ALLTEL) REDEMPTION', 31, 1, N'(ALLTEL) REDEMPTION (833-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 96, N'830-6 (AT&T WHPP) ALREADY REDEEMED', 13, 1, N'(AT&T WHPP) ALREADY REDEEMED (830-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 97, N'923-2 PIN Was For A Different Service Provider', 28, 1, N'PIN Was For A Different Service Provider (923-2)',
      0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 98, N'829-4 (O2) CARRIER PIN STATUS REQUEST', 21, 1, N'(O2) CARRIER PIN STATUS REQUEST (829-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 99, N'832-2 (CRICKET) ALREADY REDEEMED', 17, 1, N'(CRICKET) ALREADY REDEEMED (832-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 100, N'829-2 (O2) ALREADY REDEEMED', 21, 1, N'(O2) ALREADY REDEEMED (829-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 101, N'838-1 (VIRGIN) REDEMPTION', 25, 1, N'(VIRGIN) REDEMPTION (838-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 102, N'827-1 (AIRLINK) REDEMPTION', 23, 1, N'(AIRLINK) REDEMPTION (827-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 103, N'838-2 (VIRGIN) ALREADY REDEEMED', 25, 1, N'(VIRGIN) ALREADY REDEEMED (838-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 104, N'836-2 (TRACFONE) ALREADY REDEEMED', 32, 1, N'(TRACFONE) ALREADY REDEEMED (836-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 105, N'830-1 (AT&T) REDEMPTION', 13, 1, N'(AT&T) REDEMPTION (830-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 106, N'831-1 (CLARO) REDEMPTION', 18, 1, N'(CLARO) REDEMPTION (831-1)', 0 )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 107, N'822-1 (READY) REDEMPTION', 16, 1, N'(READY) REDEMPTION (822-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 108, N'822-3 (READY) CARRIER ISSUE', 16, 1, N'(READY) CARRIER ISSUE (822-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 109, N'835-3 (TMOBILE) CARRIER ISSUE', 33, 1, N'(TMOBILE) CARRIER ISSUE (835-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 110, N'825-2 (STI) ALREADY REDEEMED', 15, 1, N'(STI) ALREADY REDEEMED (825-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 111, N'839-4 (BUZZ) CARRIER PIN STATUS REQUEST', 27, 1, N'(BUZZ) CARRIER PIN STATUS REQUEST (839-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 112, N'830-8 (AT&T) CARRIER PIN STATUS REQUEST', 13, 1, N'(AT&T) CARRIER PIN STATUS REQUEST (830-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 113, N'836-1 (TRACFONE) REDEMPTION', 32, 1, N'(TRACFONE) REDEMPTION (836-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 114, N'837-4 (US CELLULAR) CARRIER PIN STATUS REQUEST', 26, 1,
      N'(US CELLULAR) CARRIER PIN STATUS REQUEST (837-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 115, N'190-3 InComm Billing-Invoice Discrepancy', 34, 1, N'InComm Billing-Invoice Discrepancy (190-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 116, N'190-7 OTC Billing/Invoice Discrepancy', 34, 1, N'OTC Billing/Invoice Discrepancy (190-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 117, N'190-9 New Terminal Install Inquiry', 34, 1, N'New Terminal Install Inquiry (190-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 118, N'190-1 InComm Software Terminal Error', 34, 1, N'InComm Software Terminal Error (190-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 119, N'190-2 InComm Product-Status Inquiry', 34, 1, N'InComm Product-Status Inquiry (190-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 120, N'190-5 OTC Software Terminal Error', 34, 1, N'OTC Software Terminal Error (190-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 121, N'190-10 New Contract Status', 34, 1, N'New Contract Status (190-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 122, N'190-4 Assist Processing InComm TXN', 34, 1, N'Assist Processing InComm TXN (190-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 123, N'190-11 Terminal Replacement Follow-Up', 34, 1, N'Terminal Replacement Follow-Up (190-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 124, N'190-6 OTC Product-Status Inquiry', 34, 1, N'OTC Product-Status Inquiry (190-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 125, N'190-8 Assist Processing OTC TXN', 34, 1, N'Assist Processing OTC TXN (190-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 126, N'190-12 Escalation-Follow-Up', 34, 1, N'Escalation-Follow-Up (190-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 127, N'130-6 VTSr Billing-Reporting Issue', 35, 1, N'VTSr Billing-Reporting Issue (130-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 128, N'130-5 VTSr Technical Issue', 35, 1, N'VTSr Technical Issue (130-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 129, N'130-2 VTSr Login Issue', 35, 1, N'VTSr Login Issue (130-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 130, N'130-4 VTSr Transaction Issue', 35, 1, N'VTSr Transaction Issue (130-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 131, N'10-2 Pin Credit Request - Wrong Product Purchased', 37, 1,
      N'Pin Credit Request - Wrong Product Purchased (10-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 132, N'20-3 Terminal Error 44', 36, 1, N'Terminal Error 44 (20-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 133, N'30-6 Change Of Ownership', 38, 1, N'Change Of Ownership (30-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 134, N'10-5 Pin Credit Request-Paper Jam-Pin Didn''t Print', 37, 1,
      N'Pin Credit Request-Paper Jam-Pin Didn''t Print (10-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 135, N'20-11 Called to Add-Delete Clerk', 36, 1, N'Called to Add-Delete Clerk (20-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 136, N'20-4 Terminal Error 45 (Out of Inventory)', 36, 1, N'Terminal Error 45 (Out of Inventory) (20-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 137, N'20-2 Menu Update', 36, 1, N'Menu Update (20-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 138, N'20-12 Set-Up New - Replacement Terminal', 36, 1, N'Set-Up New - Replacement Terminal (20-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 139, N'10-6 Pin Needed - Terminal Out Of Paper', 37, 1, N'Pin Needed - Terminal Out Of Paper (10-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 140, N'10-5 Pin Needed - Receipt Illegible/Customer Lost', 37, 1,
      N'Pin Needed - Receipt Illegible/Customer Lost (10-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 141, N'40-4 Card is in the "Consumed" status', 8, 0, N'Card is in the "Consumed" status (40-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 142, N'10-8 Customer Inquiry', 37, 1, N'Customer Inquiry (10-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 143, N'30-1 Merchant Requesting copies of Invoices', 38, 1, N'Merchant Requesting copies of Invoices (30-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 144, N'20-1 Connection Related Issues (No line,modem, IP)', 36, 1,
      N'Connection Related Issues (No line,modem, IP) (20-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 145, N'20-6 File Error (Download Needed)', 36, 1, N'File Error (Download Needed) (20-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 146, N'10-1 DDP Pin Needed', 37, 1, N'DDP Pin Needed (10-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 147, N'10-7 Pin Status Verification', 37, 1, N'Pin Status Verification (10-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 148, N'20-14 System Provider Error', 36, 1, N'System Provider Error (20-14)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 149, N'30-5 Account Deactivation', 38, 1, N'Account Deactivation (30-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 150, N'30-4 Bank Account Change', 38, 1, N'Bank Account Change (30-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 151, N'10-4 Pin Credit Request - Customer changed mind', 37, 1,
      N'Pin Credit Request - Customer Changed Mind (10-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 152, N'30-2 ACH (Requesting Draft Amount)', 38, 1, N'ACH (Requesting Draft Amount) (30-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 153, N'30-7 Request To Add New Location(s)', 38, 1, N'Request To Add New Location(s) (30-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 154, N'20-10 Auto Close Failed', 36, 0, N'Auto Close Failed (20-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 155, N'30-3 Transaction Inquiry By Date', 38, 1, N'Transaction Inquiry By Date (30-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 156, N'60-1 AirTime', 39, 1, N'AirTime (60-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 157, N'20-8 Location needs a "9" in the dial prefix', 36, 1, N'Location needs a "9" in the dial prefix (20-8)',
      0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 158, N'20-5 Terminal Swap', 36, 1, N'Terminal Swap (20-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 159, N'875-7 REPLACEMENT NOT RECVD', 44, 1, N'REPLACEMENT NOT RECVD (875-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 160, N'877-11 TRX HISTORY OVER 30 DAYS', 41, 1, N'TRX HISTORY OVER 30 DAYS (877-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 161, N'872-1 REQUEST TO BE CARD DISTRIBUTOR', 49, 1, N'REQUEST TO BE CARD DISTRIBUTOR (872-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 162, N'873-2 CUSTOMER REQUESTING REFUND', 46, 1, N'CUSTOMER REQUESTING REFUND (873-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 163, N'876-4 LOAD NOT POSTED TO ACCOUNT', 45, 1, N'LOAD NOT POSTED TO ACCOUNT (876-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 164, N'799-3 Mio ATM Decline', 43, 1, N'Mio ATM Decline (799-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 165, N'875-6 RETURNED MAIL', 44, 1, N'RETURNED MAIL (875-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 166, N'874-5 UNAUTHORIZED CALLER', 47, 1, N'UNAUTHORIZED CALLER (874-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 167, N'876-2 USED AS DEBIT VS CREDIT', 45, 1, N'USED AS DEBIT VS CREDIT (876-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 168, N'877-6 TRANSACTION HISTORY', 41, 1, N'TRANSACTION HISTORY (877-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 169, N'875-4 LOST-STOLEN CARD', 44, 1, N'LOST-STOLEN CARD (875-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 170, N'877-7 FEES', 41, 1, N'FEES (877-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 171, N'877-12 CONVERSION LETTER', 41, 1, N'CONVERSION LETTER (877-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 172, N'877-3 DENIED TRANSACTION', 41, 1, N'DENIED TRANSACTION (877-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 173, N'877-8 DIRECT DEPOSIT', 41, 1, N'DIRECT DEPOSIT (877-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 174, N'877-5 PREAUTHORIZATION RELEASE', 41, 1, N'PREAUTHORIZATION RELEASE (877-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 175, N'877-9 CARD TO CARD', 41, 1, N'CARD TO CARD (877-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 176, N'877-1 CARD BALANCE', 41, 1, N'CARD BALANCE (877-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 177, N'875-5 PREMIUM CARD NOT RECEIVED', 44, 1, N'PREMIUM CARD NOT RECEIVED (875-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 178, N'878-1 CARD VERIFICATION FAILED', 42, 1, N'CARD VERIFICATION FAILED (878-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 179, N'871-2 DROPPED CALL', 48, 1, N'DROPPED CALL (871-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 180, N'871-1 DEAD AIR', 48, 1, N'DEAD AIR (871-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 181, N'875-3 RENEWAL CARD', 44, 1, N'RENEWAL CARD (875-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 182, N'878-3 PRODUCT DISSATISFACTION', 42, 1, N'PRODUCT DISSATISFACTION (878-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 183, N'874-4 LAW ENFORCEMENT CALL', 47, 1, N'LAW ENFORCEMENT CALL (874-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 184, N'875-1 EXPIRED CARD', 44, 1, N'EXPIRED CARD (875-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 185, N'874-6 DISPUTE', 47, 1, N'DISPUTE (874-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 186, N'876-3 LOST PIN-PIN RESET', 45, 1, N'LOST PIN-PIN RESET (876-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 187, N'799-2 Mio Cash Back Decline', 43, 1, N'Mio Cash Back Decline (799-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 188, N'876-5 REVERSAL', 45, 1, N'REVERSAL (876-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 189, N'879-6 CARD NOT FUNDED', 40, 1, N'CARD NOT FUNDED (879-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 190, N'874-1 CARD IN NFRAUD STATUS-REFERRED TO COMPLIANCE', 47, 1,
      N'CARD IN NFRAUD STATUS-REFERRED TO COMPLIANCE (874-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 191, N'879-4 FAX FOLLOW UP-VERIFICATION COMPLETE', 40, 1, N'FAX FOLLOW UP-VERIFICATION COMPLETE (879-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 192, N'877-10 CARD RELOAD', 41, 1, N'CARD RELOAD (877-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 193, N'799-5 Decline Not In Tran History', 43, 1, N'Decline Not In Tran History (799-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 194, N'879-1 NEW CARD VERIFICATION PASS-ACTIVATED', 40, 1, N'NEW CARD VERIFICATION PASS-ACTIVATED (879-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 195, N'799-1 Mio Starter Card Not Converted', 43, 1, N'Mio Starter Card Not Converted (799-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 196, N'799-4 Mio C2C Bin Issue', 43, 1, N'Mio C2C Bin Issue (799-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 197, N'879-3 GUARDIAN REGISTRATION', 40, 1, N'GUARDIAN REGISTRATION (879-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 198, N'876-1 ONLINE USAGE', 45, 1, N'ONLINE USAGE (876-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 199, N'873-3 MERCHANT REQUESTING CARD DEACTIVATION', 46, 1, N'MERCHANT REQUESTING CARD DEACTIVATION (873-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 200, N'878-4 CANCELLATION REQUEST', 42, 1, N'CANCELLATION REQUEST (878-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 201, N'875-2 1ST REPLACEMENT NOT RECEIVED', 44, 1, N'1ST REPLACEMENT NOT RECEIVED (875-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 202, N'877-2 CARD LIMIT', 41, 1, N'CARD LIMIT (877-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 203, N'873-4 STOCK REFILL REQUEST', 46, 1, N'STOCK REFILL REQUEST (873-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 204, N'879-2 NEW CARD VERIFICATION FAILED-FAX REQUESTED', 40, 1,
      N'NEW CARD VERIFICATION FAILED-FAX REQUESTED (879-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 205, N'808-3 AMEX MAX DAILY LIMIT', 56, 1, N'AMEX MAX DAILY LIMIT (808-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 206, N'812-10 DISPUTE', 861, 0, N'DISPUTE (812-10)', 0 )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 207, N'809-3 NETSPEND MAX DAILY LIMIT', 55, 1, N'NETSPEND MAX DAILY LIMIT (809-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 208, N'805-7 NEXTCALA PIN ALREADY REDEEMED', 54, 1, N'NEXTCALA PIN ALREADY REDEEMED (805-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 209, N'809-6 NETSPEND DELAYED REDEMPTION', 55, 1, N'NETSPEND DELAYED REDEMPTION (809-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 210, N'805-5 NEXTCALA PIN INACTIVE', 54, 1, N'NEXTCALA PIN INACTIVE (805-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 211, N'810-1 MOMENTUM PIN LOADED', 57, 1, N'MOMENTUM PIN LOADED (810-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 212, N'812-11 MISSING PIN', 53, 1, N'MISSING PIN (812-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 213, N'807-8 MYVANILLA BALANCE', 52, 1, N'MYVANILLA BALANCE (807-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 214, N'808-8 AMEX BALANCE', 56, 1, N'AMEX BALANCE (808-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 215, N'810-3 MOMENTUM MAX DAILY LIMIT', 57, 1, N'MOMENTUM MAX DAILY LIMIT (810-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 216, N'811-5 PAYPAL MC INACTIVE PIN', 51, 1, N'PAYPAL MC INACTIVE PIN (811-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 217, N'806-1 MIO PIN LOADED', 50, 1, N'MIO PIN LOADED (806-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 218, N'811-3 PAYPAL MC MAX DAILY LIMIT', 51, 1, N'PAYPAL MC MAX DAILY LIMIT (811-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 219, N'806-2 MIO MAX BALANCE LIMIT', 50, 1, N'MIO MAX BALANCE LIMIT (806-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 220, N'805-4 NEXTCALA LOST-STOLEN PIN', 54, 1, N'NEXTCALA LOST-STOLEN PIN (805-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 221, N'811-2 PAYPAL MC MAX BALANCE LIMIT', 51, 1, N'PAYPAL MC MAX BALANCE LIMIT (811-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 222, N'805-2 NEXTCALA MAX BALANCE LIMIT', 54, 1, N'NEXTCALA MAX BALANCE LIMIT (805-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 223, N'812-12 LOAN SCAM', 53, 1, N'LOAN SCAM (812-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 224, N'812-3 VRN QUESTIONS', 53, 1, N'VRN QUESTIONS (812-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 225, N'807-3 MYVANILLA MAX DAILY LIMIT', 52, 1, N'MYVANILLA MAX DAILY LIMIT (807-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 226, N'809-2 NETSPEND MAX BALANCE LIMIT', 55, 1, N'NETSPEND MAX BALANCE LIMIT (809-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 227, N'806-4 MIO LOST-STOLEN PIN', 50, 1, N'MIO LOST-STOLEN PIN (806-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 228, N'806-8 MIO BALANCE', 50, 1, N'MIO BALANCE (806-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 229, N'812-4 NON VRN PARTNER', 53, 1, N'NON VRN PARTNER (812-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 230, N'807-5 MYVANILLA INACTIVE PIN', 52, 1, N'MYVANILLA INACTIVE PIN (807-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 231, N'807-2 MY VANILLA MAX BALANCE LIMIT', 52, 1, N'MY VANILLA MAX BALANCE LIMIT (807-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 232, N'811-1 PAYPAL MC PIN LOADED', 51, 1, N'PAYPAL MC PIN LOADED (811-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 233, N'812-8 LAW ENFORCEMENT', 53, 1, N'LAW ENFORCEMENT (812-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 234, N'805-3 NEXYCALA MAX DAILY LIMIT', 54, 1, N'NEXYCALA MAX DAILY LIMIT (805-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 235, N'807-6 MYVANILLA DELAYED REDEMPTION', 52, 1, N'MYVANILLA DELAYED REDEMPTION (807-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 236, N'811-6 PAYPAL MC DELAYED REDEMPTION', 51, 1, N'PAYPAL MC DELAYED REDEMPTION (811-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 237, N'807-7 MYVANILLA PIN ALREADY REDEEMED', 52, 1, N'MYVANILLA PIN ALREADY REDEEMED (807-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 238, N'811-8 PAYPAL MC BALANCE', 51, 1, N'PAYPAL MC BALANCE (811-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 239, N'806-5 MIO INACTIVE PIN', 50, 1, N'MIO INACTIVE PIN (806-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 240, N'812-1 REFUND', 53, 0, N'REFUND (812-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 241, N'808-2 AMEX MAX BALANCE LIMIT', 56, 1, N'AMEX MAX BALANCE LIMIT (808-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 242, N'809-7 NETSPEND PIN ALREADY REDEEMED', 55, 1, N'NETSPEND PIN ALREADY REDEEMED (809-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 243, N'812-7 DEAD AIR', 53, 1, N'DEAD AIR (812-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 244, N'810-7 MOMENTUM PIN ALREADY REDEEMED', 57, 1, N'MOMENTUM PIN ALREADY REDEEMED (810-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 245, N'810-6 MOMENTUM DELAYED REDEMPTION', 57, 1, N'MOMENTUM DELAYED REDEMPTION (810-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 246, N'805-6 NEXTCALA DELAYED REDEMPTION', 54, 1, N'NEXTCALA DELAYED REDEMPTION (805-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 247, N'806-3 MIO MAX DAILY LIMIT', 50, 1, N'MIO MAX DAILY LIMIT (806-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 248, N'812-2 STORE LOCATIONS', 53, 1, N'STORE LOCATIONS (812-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 249, N'809-5 NETSPEND INACTIVE PIN', 55, 1, N'NETSPEND INACTIVE PIN (809-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 250, N'809-4 NETSPEND LOST-STOLEN PIN', 55, 1, N'NETSPEND LOST-STOLEN PIN (809-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 251, N'810-5 MOMENTUM INACTIVE PIN', 57, 1, N'MOMENTUM INACTIVE PIN (810-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 252, N'805-1 NEXTCALA PIN LOADED', 54, 1, N'NEXTCALA PIN LOADED (805-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 253, N'809-1 NETSPEND PIN LOADED', 55, 1, N'NETSPEND PIN LOADED (809-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 254, N'806-6 MIO DELAYED REDEMPTION', 50, 1, N'MIO DELAYED REDEMPTION (806-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 255, N'806-7 MIO PIN ALREADY REDEEMED', 50, 1, N'MIO PIN ALREADY REDEEMED (806-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 256, N'808-5 AMEX INACTIVE PIN', 56, 1, N'AMEX INACTIVE PIN (808-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 257, N'809-8 NETSPEND BALANCE', 55, 1, N'NETSPEND BALANCE (809-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 258, N'808-4 AMEX LOST-STOLEN PIN', 56, 1, N'AMEX LOST-STOLEN PIN (808-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 259, N'808-1 AMEX PIN LOADED''', 56, 1, N'AMEX PIN LOADED'' (808-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 260, N'812-13 FRAUD', 53, 1, N'FRAUD (812-13)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 261, N'807-1 MYVANILLA PIN LOADED', 52, 1, N'MYVANILLA PIN LOADED (807-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 262, N'811-4 PAYPAL MC LOST-STOLEN PIN', 51, 1, N'PAYPAL MC LOST-STOLEN PIN (811-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 263, N'810-8 MOMENTUM BALANCE', 57, 1, N'MOMENTUM BALANCE (810-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 264, N'810-2 MOMENTUM MAX BALANCE LIMIT', 57, 1, N'MOMENTUM MAX BALANCE LIMIT (810-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 265, N'808-7 AMEX PIN ALREADY REDEEMED', 56, 1, N'AMEX PIN ALREADY REDEEMED (808-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 266, N'810-4 MOMENTUM LOST-STOLEN PIN', 57, 1, N'MOMENTUM LOST-STOLEN PIN (810-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 267, N'811-7 PAYPAL MC PIN ALREADY REDEEMED', 51, 1, N'PAYPAL MC PIN ALREADY REDEEMED (811-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 268, N'812-5 USE VRN TO MAKE PURCHASE', 53, 1, N'USE VRN TO MAKE PURCHASE (812-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 269, N'808-6 AMEX DELAYED REDEMPTION', 56, 1, N'AMEX DELAYED REDEMPTION (808-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 270, N'812-14 BALANCE', 53, 1, N'BALANCE (812-14)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 271, N'807-10 MYVANILLA LOST-STOLEN PIN', 52, 1, N'807-10 MYVANILLA LOST-STOLEN PIN', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 272, N'812-9 JIRA UPDATE', 861, 1, N'JIRA UPDATE (812-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 273, N'885-22 MY VANILLA CARD DECLINED TRN', 58, 1, N'MY VANILLA CARD DECLINED TRN (885-22)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 274, N'885-18 VRN DISPUTE PENDING', 58, 1, N'VRN DISPUTE PENDING (885-18)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 275, N'885-20 VRN OTHER', 58, 1, N'VRN OTHER (885-20)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 276, N'885-8 MY VANILLA PREAUTH RELEASE', 58, 1, N'MY VANILLA PREAUTH RELEASE (885-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 277, N'885-14 LYFE PREAUTH RELEASE', 58, 1, N'LYFE PREAUTH RELEASE (885-14)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 278, N'885-21 MY VANILLA CARD FUNCTIONALITY', 58, 1, N'MY VANILLA CARD FUNCTIONALITY (885-21)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 279, N'885-7 MY VANILLA HOT CARD', 58, 1, N'MY VANILLA HOT CARD (885-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 280, N'885-9 MY VANILLA OTHER', 58, 1, N'MY VANILLA OTHER (885-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 281, N'882-10 GIFT CARD OTHER', 60, 1, N'GIFT CARD OTHER (882-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 282, N'881-6 MIO ESC', 59, 1, N'MIO ESC (881-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 283, N'885-15 LYFE OTHER', 58, 1, N'LYFE OTHER (885-15)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 284, N'885-19 VRN INITIAL DISPUTE', 58, 1, N'VRN INITIAL DISPUTE (885-19)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 285, N'885-11 JH PREAUTH RELEASE', 58, 1, N'JH PREAUTH RELEASE (885-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 286, N'885-12 JH OTHER', 58, 1, N'JH OTHER (885-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 287, N'883-5 WIRELSS ESC', 61, 1, N'WIRELSS ESC (883-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 288, N'885-17 VRN POST DISPUTE', 58, 1, N'VRN POST DISPUTE (885-17)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 289, N'885-10 JH HOT CARD', 58, 1, N'JH HOT CARD (885-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 290, N'882-7 GIFT CARD GAS PREAUTH', 60, 1, N'GIFT CARD GAS PREAUTH (882-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 291, N'882-9 GIFT CARD BAD CREDIT', 60, 1, N'GIFT CARD BAD CREDIT (882-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 292, N'885-16 NEXTCALA ESCALATION', 58, 1, N'NEXTCALA ESCALATION (885-16)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 293, N'882-11 GIFT CARD DISPUTE', 60, 1, N'GIFT CARD DISPUTE (882-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 294, N'882-8 GIFT CARD NON GAS PREAUTH', 60, 1, N'GIFT CARD NON GAS PREAUTH (882-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 295, N'885-13 LYFE HOT CARD', 58, 1, N'LYFE HOT CARD (885-13)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 296, N'852-2 VELOCITY REACHED', 63, 1, N'VELOCITY REACHED (852-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 297, N'853-1 DEAD AIR', 65, 1, N'DEAD AIR (853-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 298, N'851-2 REFERRED TO PAYPAL', 64, 1, N'REFERRED TO PAYPAL (851-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 299, N'851-1 PAYPAL WEBSITE DOWN', 64, 1, N'PAYPAL WEBSITE DOWN (851-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 300, N'852-5 LOST CARD', 63, 1, N'LOST CARD (852-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 301, N'850-2 KYC NOT REGISTERED', 62, 1, N'KYC NOT REGISTERED (850-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 302, N'852-3 PIN NOT ACTIVATED', 63, 1, N'PIN NOT ACTIVATED (852-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 303, N'853-2 STORE LOCATIONS', 65, 1, N'STORE LOCATIONS (853-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 304, N'853-3 CHECK REFUND STATUS', 65, 1, N'CHECK REFUND STATUS (853-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 305, N'852-1 PIN ALREADY REDEEMED', 63, 1, N'PIN ALREADY REDEEMED (852-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 306, N'852-4 CUSTOMER LOST RECIEPT', 63, 1, N'CUSTOMER LOST RECEIPT (852-4)', 0 )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 307, N'850-1 CHECK PIN STATUS', NULL, 0, N'CHECK PIN STATUS (850-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 308, N'110-1 MetroPCS Login-Password Issue', 66, 1, N'MetroPCS Login-Password Issue (110-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 309, N'110-6 All Other MetroPCS Issues', 66, 1, N'All Other MetroPCS Issues (110-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 310, N'867-2 Incorrect PIN', 69, 1, N'Incorrect PIN (867-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 311, N'868-1 SUNPASS IVR IS DOWN', 68, 1, N'SUNPASS IVR IS DOWN (868-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 312, N'867-3 PIN Redeemed to Wrong Transponder', 69, 1, N'PIN Redeemed to Wrong Transponder (867-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 313, N'869-1 Load Value', 67, 1, N'Load Value (869-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 314, N'867-5 Customer Lost receipt', 69, 1, N'Customer Lost receipt (867-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 315, N'867-4 PIN Not Activated', 69, 1, N'PIN Not Activated (867-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 316, N'867-1 PIN ALREADY REDEEMED', 69, 1, N'PIN ALREADY REDEEMED (867-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 317, N'869-2 Check PIN Status', 67, 1, N'Check PIN Status (869-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 318, N'866-2 DEAD AIR', 70, 1, N'DEAD AIR (866-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 319, N'985-6 RETURNED MAIL', 76, 1, N'RETURNED MAIL (985-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 320, N'980-2 MIO UPGRADE OFFER', 75, 1, N'MIO UPGRADE OFFER (980-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 321, N'988-2 EXPIRED CARD', 71, 1, N'EXPIRED CARD (988-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 322, N'974-6 SPLIT TENDER', 79, 1, N'SPLIT TENDER (974-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 323, N'974-8 PENDING PREAUTH', 79, 1, N'PENDING PREAUTH (974-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 324, N'985-8 REPLACEMENT NOT RECVD', 76, 1, N'REPLACEMENT NOT RECVD (985-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 325, N'974-12 RECURRING BILLING', 79, 1, N'RECURRING BILLING (974-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 326, N'974-11 INTERNATIONAL USE', 79, 1, N'INTERNATIONAL USE (974-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 327, N'984-7 CONSUMED WALMART.COM', 78, 0, N'CONSUMED WALMART.COM (984-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 328, N'975-3 TRANS HISTORY', 77, 1, N'TRANS HISTORY (975-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 329, N'974-9 DELAYED REDEMPTION', 79, 1, N'DELAYED REDEMPTION (974-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 330, N'974-10 CHANGE-UPDATE ZIP CODE', 79, 1, N'CHANGE-UPDATE ZIP CODE (974-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 331, N'982-6 DISPUTE', 73, 1, N'DISPUTE (982-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 332, N'974-3 TOLERANCE LEVELS', 79, 1, N'TOLERANCE LEVELS (974-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 333, N'978-3 SYSTEM DOWN', 72, 1, N'SYSTEM DOWN (978-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 334, N'975-2 PREAUTH RELEASE', 77, 1, N'PREAUTH RELEASE (975-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 335, N'975-4 FEES', 77, 1, N'FEES (975-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 336, N'981-1 CARD NOT ACTIVATED', 74, 0, N'CARD NOT ACTIVATED (981-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 337, N'974-1 ZIP CODE NOT ADDED', 79, 1, N'ZIP CODE NOT ADDED (974-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 338, N'980-1 REQUEST TO BE CARD DISTRIBUTOR', 75, 1, N'REQUEST TO BE CARD DISTRIBUTOR (980-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 339, N'985-9 STOLEN CARD', 76, 1, N'STOLEN CARD (985-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 340, N'974-13 ATM-CASH BACK', 79, 1, N'ATM-CASH BACK (974-13)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 341, N'984-3 BAD CREDIT', 78, 1, N'BAD CREDIT (984-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 342, N'974-4 GAS PARTIAL PREAUTH', 79, 1, N'GAS PARTIAL PREAUTH (974-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 343, N'975-6 IS CARD ACTIVE?', 77, 1, N'IS CARD ACTIVE? (975-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 344, N'982-4 LAW ENFORCEMENT CALL', 73, 1, N'LAW ENFORCEMENT CALL (982-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 345, N'981-4 WALGREENS STORE MANAGER', 74, 1, N'WALGREENS STORE MANAGER (981-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 346, N'974-5 CARD NOT FUNDED', 79, 1, N'CARD NOT FUNDED (974-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 347, N'974-2 PIN RESET QUESTION', 79, 1, N'PIN RESET QUESTION (974-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 348, N'984-1 CARD IN LOST STATUS', 78, 1, N'CARD IN LOST STATUS (984-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 349, N'981-2 CUSTOMER REQUESTING REFUND', 74, 1, N'CUSTOMER REQUESTING REFUND (981-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 350, N'981-3 MERCHANT REQUESTING CARD DEACTIVATION', 74, 1, N'MERCHANT REQUESTING CARD DEACTIVATION (981-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 351, N'982-1 CARD IN FRAUD STATUS; REFERRED TO COMPLIANCE', 73, 1,
      N'CARD IN FRAUD STATUS; REFERRED TO COMPLIANCE (982-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 352, N'985-1 EXPIRED CARD', 76, 1, N'EXPIRED CARD (985-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 353, N'980-3 Wanted to Upgrade to My Vanilla', 75, 1, N'Wanted to Upgrade to My Vanilla (980-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 354, N'975-5 BALANCE', 77, 1, N'BALANCE (975-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 355, N'984-2 CARD IN RESTRICTED STATUS', 78, 1, N'CARD IN RESTRICTED STATUS (984-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 356, N'974-7 CARD NOT IN GC', 79, 1, N'CARD NOT IN GC (974-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 357, N'988-3 PRODUCT DISSATISFACTION', 71, 1, N'PRODUCT DISSATISFACTION (988-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 358, N'978-1 DEAD AIR', 72, 1, N'DEAD AIR (978-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 359, N'984-6 CONSUMED CARD', 78, 0, N'CONSUMED CARD (984-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 360, N'978-2 DROPPED CALL', 72, 1, N'DROPPED CALL (978-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 361, N'975-7 CARD LIMIT', 77, 1, N'CARD LIMIT (975-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 362, N'888-6 CARD LIMIT', 81, 1, N'CARD LIMIT (888-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 363, N'890-3 GIFTCARD VS. PREPAID CARD INQUIRY', 80, 1, N'GIFTCARD VS. PREPAID CARD INQUIRY (890-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 364, N'889-10 GAS PUMP/DECLINED', 82, 0, N'GAS PUMP/DECLINED (889-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 365, N'897-3 REPLACEMENT NOT RECVD', 87, 1, N'REPLACEMENT NOT RECVD (897-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 366, N'895-1 FEE INQUIRY', 88, 1, N'FEE INQUIRY (895-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 367, N'890-1 OTHER', 80, 1, N'OTHER (890-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 368, N'888-2 PREAUTH RELEASE', 81, 1, N'PREAUTH RELEASE (888-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 369, N'890-2 DEAD AIR', 80, 1, N'DEAD AIR (890-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 370, N'893-3 MERCHANT REQUESTING CARD DEACTIVATION', 83, 1, N'MERCHANT REQUESTING CARD DEACTIVATION (893-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 371, N'896-1 BAD CREDIT STATUS', 89, 1, N'BAD CREDIT STATUS (896-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 372, N'889-9 GAS PUMP/GOT GAS', 82, 0, N'GAS PUMP/GOT GAS (889-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 373, N'888-3 TRANS HISTORY', 81, 1, N'TRANS HISTORY (888-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 374, N'889-5 SPLIT TENDER', 82, 1, N'SPLIT TENDER (889-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 375, N'889-2 PIN RESET QUESTION', 82, 1, N'PIN RESET QUESTION (889-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 376, N'894-4 LAW ENFORCEMENT CALL', 84, 1, N'LAW ENFORCEMENT CALL (894-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 377, N'889-8 CHANGE/UPDATE ZIP CODE', 82, 0, N'CHANGE/UPDATE ZIP CODE (889-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 378, N'894-1 CARD IN FRAUD STATUS: REFER TO COMPLIANCE', 84, 1,
      N'CARD IN FRAUD STATUS: REFER TO COMPLIANCE (894-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 379, N'894-3 DISPUTED CHGS:PACKET SENT', 84, 1, N'DISPUTED CHGS:PACKET SENT (894-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 380, N'894-5 TARGET SECURITY BREACH INQUIRY', 84, 1, N'TARGET SECURITY BREACH INQUIRY (894-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 381, N'893-2 CUSTOMER REQUESTING REFUND', 83, 1, N'CUSTOMER REQUESTING REFUND (893-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 382, N'888-5 IS CARD ACTIVE?', 81, 1, N'IS CARD ACTIVE? (888-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 383, N'889-3 TOLERANCE LEVELS', 82, 1, N'TOLERANCE LEVELS (889-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 384, N'889-6 PENDING CHARGE', 82, 1, N'PENDING CHARGE (889-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 385, N'896-2 CARD NOT ACTIVATED BY MERCHANT', 89, 0, N'CARD NOT ACTIVATED BY MERCHANT (896-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 386, N'894-2 DISPUTED CHGS:NO PACKET SENT', 84, 1, N'DISPUTED CHGS:NO PACKET SENT (894-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 387, N'892-2 EXPIRED CARD REFUND', 86, 1, N'EXPIRED CARD REFUND (892-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 388, N'892-1 NEW CARD REFUND', 86, 1, N'NEW CARD REFUND (892-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 389, N'897-1 EXPIRED CARD', 87, 1, N'EXPIRED CARD (897-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 390, N'888-12 ATM-CASH BACK', 81, 1, N'ATM-CASH BACK (888-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 391, N'891-1 JIRA', 85, 1, N'JIRA (891-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 392, N'889-7 ZIP CODE REGISTRATION', 82, 1, N'ZIP CODE REGISTRATION (889-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 393, N'895-2 ACTIVATION FEE', 88, 1, N'ACTIVATION FEE (895-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 394, N'893-1 CARD NOT ACTIVATED', 83, 0, N'CARD NOT ACTIVATED (893-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 395, N'897-2 LOST CARD', 87, 1, N'LOST CARD (897-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 396, N'889-11 RECURRING BILLING', 82, 1, N'RECURRING BILLING (889-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 397, N'888-4 BALANCE', 81, 1, N'BALANCE (888-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 398, N'792-5 My Vanilla Fees', 98, 1, N'My Vanilla Fees (792-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 399, N'790-4 My Vanilla Card Not Funded', 90, 1, N'My Vanilla Card Not Funded (790-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 400, N'792-10 My Vanilla Email Trans History', 98, 1, N'My Vanilla Email Trans History (792-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 401, N'796-2 My Vanilla Merchant requesting Card', 94, 1, N'My Vanilla Merchant requesting Card (796-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 402, N'794-6 My Vanilla Replacement Not received', 96, 1, N'My Vanilla Replacement Not received (794-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 403, N'791-3 My Vanilla Cancellation Request', 91, 1, N'My Vanilla Cancellation Request (791-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 404, N'790-2 My Vanilla New Card Registration Failed', 90, 1, N'My Vanilla New Card Registration Failed (790-2)',
      0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 405, N'793-4 My Vanilla Insufficient Funds', 97, 1, N'My Vanilla Insufficient Funds (793-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 406, N'793-5 My Vanilla Incorrect CVV', 97, 1, N'My Vanilla Incorrect CVV (793-5)', 0 )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 407, N'792-13 My Vanilla Change PIN', 98, 1, N'My Vanilla Change PIN (792-13)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 408, N'790-7 My Vanilla Will Send Docs', 90, 1, N'My Vanilla Will Send Docs (790-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 409, N'792-6 My Vanilla Direct Deposit', 98, 1, N'My Vanilla Direct Deposit (792-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 410, N'795-5 My Vanilla eFax Look Up', 95, 1, N'My Vanilla eFax Look Up (795-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 411, N'791-1 My Vanilla Card Verification Failed', 91, 1, N'My Vanilla Card Verification Failed (791-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 412, N'790-3 My Vanilla Activate GPR Card', 90, 1, N'My Vanilla Activate GPR Card (790-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 413, N'792-11 My Vanilla Add/Edit Alerts', 98, 1, N'My Vanilla Add/Edit Alerts (792-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 414, N'793-9 My Vanilla Decline Not In History', 97, 1, N'My Vanilla Decline Not In History (793-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 415, N'791-2 My Vanilla Product Dissatisfaction', 91, 1, N'My Vanilla Product Dissatisfaction (791-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 416, N'794-4 My Vanilla Premium Card Not Received', 96, 1, N'My Vanilla Premium Card Not Received (794-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 417, N'793-2 My Vanilla Incorrect PIN', 97, 1, N'My Vanilla Incorrect PIN (793-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 418, N'793-7 My Vanilla Card Inactive', 97, 1, N'My Vanilla Card Inactive (793-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 419, N'795-4 My Vanilla Dispute', 95, 1, N'My Vanilla Dispute (795-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 420, N'793-1 My Vanilla Failed AVS', 97, 1, N'My Vanilla Failed AVS (793-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 421, N'790-1 My Vanilla New Card Verification Pass', 90, 1, N'My Vanilla New Card Verification Pass (790-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 422, N'795-3 My Vanilla Unauthorized Caller', 95, 1, N'My Vanilla Unauthorized Caller (795-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 423, N'796-1 My Vanilla Customer Requesting refund', 94, 1, N'My Vanilla Customer Requesting refund (796-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 424, N'792-4 My Vanilla Web Access', 98, 1, N'My Vanilla Web Access (792-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 425, N'794-5 My Vanilla Returned Mail', 96, 1, N'My Vanilla Returned Mail (794-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 426, N'795-2 My Vanilla Law Enforcement Call', 95, 1, N'My Vanilla Law Enforcement Call (795-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 427, N'794-2 My Vanilla Renewal Card', 96, 1, N'My Vanilla Renewal Card (794-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 428, N'792-12 My Vanilla Update Acct Info', 98, 1, N'My Vanilla Update Acct Info (792-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 429, N'793-8 My Vanilla Limits Reached', 97, 1, N'My Vanilla Limits Reached (793-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 430, N'793-3 My Vanilla Tolerance', 97, 1, N'My Vanilla Tolerance (793-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 431, N'792-2 My Vanilla Gas Pump Preauth', 98, 1, N'My Vanilla Gas Pump Preauth (792-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 432, N'794-3 My Vanilla Lost-Stolen', 96, 1, N'My Vanilla Lost-Stolen (794-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 433, N'792-8 My Vanilla Reload', 98, 1, N'My Vanilla Reload (792-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 434, N'797-1 My Vanilla Request to be Card Distributor', 93, 1,
      N'My Vanilla Request to be Card Distributor (797-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 435, N'792-7 My Vanilla Card to Card', 98, 1, N'My Vanilla Card to Card (792-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 436, N'795-1 My Vanilla Card in Hot Status', 95, 1, N'My Vanilla Card in Hot Status (795-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 437, N'794-1 My Vanilla Expired Card', 96, 1, N'My Vanilla Expired Card (794-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 438, N'793-10 My Vanilla ATM Decline', 97, 1, N'My Vanilla ATM Decline (793-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 439, N'790-6 My Vanilla Spend Down Activation', 90, 1, N'My Vanilla Spend Down Activation (790-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 440, N'793-6 My Vanilla Trans History', 97, 1, N'My Vanilla Trans History (793-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 441, N'792-1 My Vanilla Card Balance', 98, 1, N'My Vanilla Card Balance (792-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 442, N'790-5 My Vanilla Referred to Website', 90, 1, N'My Vanilla Referred to Website (790-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 443, N'798-1 My Vanilla Dead Air', 92, 1, N'My Vanilla Dead Air (798-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 444, N'792-9 My Vanilla Email DD Form', 98, 1, N'My Vanilla Email DD Form (792-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 445, N'792-3 My Vanilla Preauth Release', 98, 1, N'My Vanilla Preauth Release (792-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 446, N'862-6 TRANSPONDER ISSUE', 102, 1, N'TRANSPONDER ISSUE (862-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 447, N'862-4 CARD NOT FOUND', 102, 1, N'CARD NOT FOUND (862-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 448, N'863-1 PEACHPASS IVR DOWN', 101, 1, N'PEACHPASS IVR DOWN (863-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 449, N'862-3 PIN REDEEMED TO WRONG TRANSPONDER', 102, 1, N'PIN REDEEMED TO WRONG TRANSPONDER (862-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 450, N'864-2 CHECK PIN STATUS', 100, 1, N'CHECK PIN STATUS (864-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 451, N'862-2 INACTIVE PIN', 102, 1, N'INACTIVE PIN (862-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 452, N'861-1 DEAD AIR', 99, 1, N'DEAD AIR (861-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 453, N'862-5 DAMAGED PIN-CARD', 102, 1, N'DAMAGED PIN-CARD (862-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 454, N'862-1 ALREADY REDEEMED', 102, 1, N'ALREADY REDEEMED (862-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 455, N'864-1 LOAD VALUE', 100, 1, N'LOAD VALUE (864-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 456, N'862-9 LOADED TOO MUCH MONEY', 102, 1, N'LOADED TOO MUCH MONEY (862-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 457, N'862-7 LOST CARD', 102, 1, N'LOST CARD (862-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 458, N'862-8 VIOLATION INFO', 102, 1, N'VIOLATION INFO (862-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 459, N'883-1 DCMS CRDT', 61, 1, N'DCMS CRDT (883-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 460, N'885-3 MYVANILLA UPLOAD DOC''S', 58, 1, N'MYVANILLA UPLOAD DOC''S (885-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 461, N'880-6 UNLOCK GC', 104, 1, N'UNLOCK GC (880-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 462, N'883-3 WIRELSS PIN REPL', 61, 1, N'WIRELSS PIN REPL (883-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 463, N'883-2 METRO CRDT', 61, 1, N'METRO CRDT (883-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 464, N'883-6 EPAY QUES', 61, 1, N'EPAY QUES (883-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 465, N'880-2 IDOLOGY', 104, 1, N'IDOLOGY (880-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 466, N'880-8 REFERRED TO EFAX LINE', 104, 1, N'REFERRED TO EFAX LINE (880-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 467, N'883-7 WIRELSS QUES', 61, 1, N'WIRELSS QUES (883-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 468, N'884-3 OTHER', 103, 1, N'OTHER (884-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 469, N'882-2 GC FEES', 60, 1, N'GC FEES (882-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 470, N'882-4 BD VANILLA QUES', 60, 1, N'BD VANILLA QUES (882-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 471, N'882-3 GD VANILLA QUES', 60, 1, N'GD VANILLA QUES (882-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 472, N'881-5 BAD MIO QUEST', 59, 1, N'BAD MIO QUEST (881-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 473, N'884-2 HLTH BRK APPR', 103, 1, N'HLTH BRK APPR (884-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 474, N'883-8 LD QUES', 61, 1, N'LD QUES (883-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 475, N'881-2 CHNG DEL MIO', 59, 1, N'CHNG DEL MIO (881-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 476, N'885-4 GD MYVANILLA QUESTION', 58, 1, N'GD MYVANILLA QUESTION (885-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 477, N'885-1 MYVANILLA C2C', 58, 1, N'MYVANILLA C2C (885-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 478, N'881-3 CRDT MIO ACCT', 59, 1, N'CRDT MIO ACCT (881-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 479, N'880-5 FORGOT PWORD', 104, 1, N'FORGOT PWORD (880-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 480, N'881-1 MIO C2C', 59, 1, N'MIO C2C (881-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 481, N'882-1 GC PREAUTH', 60, 1, N'GC PREAUTH (882-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 482, N'880-1 PENLEY', 104, 1, N'PENLEY (880-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 483, N'881-4 GD MIO QUES', 59, 1, N'GD MIO QUES (881-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 484, N'880-3 EFAX', 104, 1, N'EFAX (880-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 485, N'882-6 CHG GC STATUS', 60, 1, N'CHG GC STATUS (882-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 486, N'883-4 CLARO PIN REPL', 61, 1, N'CLARO PIN REPL (883-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 487, N'880-7 REFERRED TO ESCALATION LINE', 104, 1, N'REFERRED TO ESCALATION LINE (880-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 488, N'880-4 PAYMENTS MGR', 104, 1, N'PAYMENTS MGR (880-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 489, N'885-5 MYVANILLA BAD QUESTION', 58, 1, N'MYVANILLA BAD QUESTION (885-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 490, N'885-2 MYVANILLA RELEASE HOLD', 58, 1, N'MYVANILLA RELEASE HOLD (885-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 491, N'170-1 Gift Card - Customer', 105, 1, N'Gift Card - Customer (170-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 492, N'170-3 Trouble Ticket Follow-Up', 105, 1, N'Trouble Ticket Follow-Up (170-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 493, N'170-2 Gift Card - Merchant', 105, 1, N'Gift Card - Merchant (170-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 494, N'909-3 CARD STACKING', 108, 1, N'CARD STACKING (909-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 495, N'907-1 CREDIT FORM COMPLETED', 107, 1, N'CREDIT FORM COMPLETED (907-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 496, N'901-3 WIRELESS ISSUE', 114, 1, N'WIRELESS ISSUE (901-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 497, N'901-4 BOOST ISSUE', 114, 1, N'BOOST ISSUE (901-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 498, N'904-2 RETURN TO MERCHANT W-RECEIPT', 109, 1, N'RETURN TO MERCHANT W-RECEIPT (904-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 499, N'908-1 CARRIER IVR DOWN', 106, 1, N'CARRIER IVR DOWN (908-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 500, N'908-2 FASTCARD IVR DOWN', 106, 1, N'FASTCARD IVR DOWN (908-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 501, N'903-1 PROMOTIONAL CARD', 110, 1, N'PROMOTIONAL CARD (903-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 502, N'906-2 TRANSACTION REVIEW', 111, 1, N'TRANSACTION REVIEW (906-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 503, N'902-1 DEAD AIR', 113, 1, N'DEAD AIR (902-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 504, N'904-1 MERCHANT CALLED', 109, 1, N'MERCHANT CALLED (904-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 505, N'905-1 TROUBLE TICKET CREATED', 112, 1, N'TROUBLE TICKET CREATED (905-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 506, N'901-1 APPLE ITUNES CARD', 114, 1, N'APPLE ITUNES CARD (901-1)', 0 )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 507, N'901-5 XBOX CARD', 114, 1, N'XBOX CARD (901-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 508, N'909-2 CHECK PIN STATUS', 108, 1, N'CHECK PIN STATUS (909-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 509, N'909-1 RECHARGE LD', 108, 1, N'RECHARGE LD (909-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 510, N'906-1 PROVIDE CARRIER PHONE NUMBER', 111, 1, N'PROVIDE CARRIER PHONE NUMBER (906-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 511, N'902-2 DROPPED CALL', 113, 1, N'DROPPED CALL (902-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 512, N'710-2 3rd Party Product', 115, 1, N'3rd Party Product (710-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 513, N'710-3 Escalation', 115, 1, N'Escalation (710-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 514, N'710-4 Callback Not Received', 115, 1, N'Callback Not Received (710-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 515, N'710-5 Merchant Calling', 115, 1, N'Merchant Calling (710-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 516, N'710-1 Vanilla Product', 115, 1, N'Vanilla Product (710-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 517, N'700-5 IS CARD ACTIVE', 116, 1, N'IS CARD ACTIVE (700-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 518, N'701-1 ZIP CODE NOT REGISTERED', 117, 1, N'ZIP CODE NOT REGISTERED (701-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 519, N'701-4 NON PARTICIPATING MERCHANT', 117, 1, N'NON PARTICIPATING MERCHANT (701-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 520, N'700-6 RELOAD HISTORY', 116, 1, N'RELOAD HISTORY (700-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 521, N'700-1 DISCOUNT INQUIRY', 116, 1, N'DISCOUNT INQUIRY (700-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 522, N'700-2 PREAUTH RELEASE', 116, 1, N'PREAUTH RELEASE (700-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 523, N'700-7 ADDING ZIP CODE', 116, 1, N'ADDING ZIP CODE (700-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 524, N'700-8 LOST/STOLEN CARD', 116, 1, N'LOST/STOLEN CARD (700-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 525, N'701-8 INSUFFICIENT FUNDS', 117, 1, N'INSUFFICIENT FUNDS (701-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 526, N'700-4 BALANCE', 116, 1, N'BALANCE (700-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 527, N'701-7 PENDING CHARGE', 117, 1, N'PENDING CHARGE (701-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 528, N'701-6 NOT AT GAS PUMP', 117, 1, N'NOT AT GAS PUMP (701-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 529, N'701-5 CARD NOT FUNDED', 117, 1, N'CARD NOT FUNDED (701-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 530, N'700-3 TRANSACTION HISTORY', 116, 1, N'TRANSACTION HISTORY (700-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 531, N'701-3 RELOAD LIMIT EXCEEDED', 117, 1, N'RELOAD LIMIT EXCEEDED (701-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 532, N'701-2 USED AS DEBIT', 117, 1, N'USED AS DEBIT (701-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 533, N'929-1 INSUFFICIENT FUNDS', 118, 1, N'INSUFFICIENT FUNDS (929-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 534, N'929-3 SPLIT TENDER', 118, 1, N'SPLIT TENDER (929-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 535, N'925-1 LOST-STOLEN', 120, 1, N'LOST STOLEN (925-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 536, N'927-1 PIN ALREADY REDEEMED', 119, 1, N'PIN ALREADY REDEEMED (927-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 537, N'927-4 PIN NOT ACTIVATED', 119, 1, N'PIN NOT ACTIVATED (927-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 538, N'927-3 PIN REDEEMED TO WRONG NUMBER', 119, 1, N'PIN REDEEMED TO WRONG NUMBER (927-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 539, N'925-2 EXPIRED CARD', 120, 1, N'EXPIRED CARD (925-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 540, N'924-2 RELOAD LIMITS', 121, 1, N'RELOAD LIMITS (924-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 541, N'925-3 DAMAGED CARD', 120, 1, N'DAMAGED CARD (925-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 542, N'925-4 CARD 2 CARD TRANSFER', 120, 1, N'CARD 2 CARD TRANSFER (925-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 543, N'925-5 RETURN NOT POSTED', 120, 1, N'RETURN NOT POSTED (925-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 544, N'924-1 WHERE CAN THEY USE', 121, 1, N'WHERE CAN THEY USE (924-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 545, N'160-3 Terminal Issue', 122, 1, N'Terminal Issue (160-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 546, N'160-1 Card Status', 122, 1, N'Card Status (160-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 547, N'160-5 Other', 122, 1, N'Other (160-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 548, N'160-4 Accounting-Billing Inquiry', 122, 1, N'Accounting-Billing Inquiry (160-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 549, N'160-2 Card Activation-Deactivation Issue', 122, 1, N'Card Activation-Deactivation Issue (160-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 550, N'10001-7 CARD NOT IN GREENCARD', 124, 1, N'CARD NOT IN GREENCARD (10001-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 551, N'996-1 BAD CREDIT STATUS', 123, 1, N'BAD CREDIT STATUS (996-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 552, N'994-1 CARD IN FRAUD STATUS REFERRED TO COMPLIANCE', 126, 1,
      N'CARD IN FRAUD STATUS REFERRED TO COMPLIANCE (994-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 553, N'10001-2 CHANGE/UPDATE ZIP CODE', 124, 1, N'CHANGE/UPDATE ZIP CODE (10001-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 554, N'10001-1 ADD ZIP CODE', 124, 1, N'ADD ZIP CODE (10001-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 555, N'10001-3 TOLERANCE LEVELS', 124, 1, N'TOLERANCE LEVELS (10001-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 556, N'10001-8 PENDING CHARGE', 124, 1, N'PENDING CHARGE (10001-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 557, N'997-6 RETURNED MAIL', 125, 1, N'RETURNED MAIL (997-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 558, N'10000-5 BALANCE', 128, 1, N'BALANCE (10000-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 559, N'10001-4 GAS PREAUTH', 124, 1, N'GAS PREAUTH (10001-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 560, N'997-1 EXPIRED CARD', 125, 1, N'EXPIRED CARD (997-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 561, N'997-9 STOLEN CARD', 125, 1, N'STOLEN CARD (997-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 562, N'10000-4 FEES', 128, 1, N'FEES (10000-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 563, N'10001-9 DELAYED REDEMPTION', 124, 1, N'DELAYED REDEMPTION (10001-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 564, N'994-5 DISPUTE', 126, 1, N'DISPUTE (994-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 565, N'10000-6 IS CARD ACTIVE?', 128, 1, N'IS CARD ACTIVE? (10000-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 566, N'10000-2 PREAUTH RELEASE', 128, 1, N'PREAUTH RELEASE (10000-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 567, N'996-5 CARD IN RESTRICTED STATUS', 123, 1, N'CARD IN RESTRICTED STATUS (996-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 568, N'991-2 DROPPED CALL', 130, 1, N'DROPPED CALL (991-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 569, N'996-4 CARD IN LOST STATUS', 123, 1, N'CARD IN LOST STATUS (996-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 570, N'10000-3 TRANSACTION HISTORY', 128, 1, N'TRANSACTION HISTORY (10000-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 571, N'995-4 REPLACEMENT CARD FEE', 127, 1, N'REPLACEMENT CARD FEE (995-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 572, N'10001-5 CARD NOT FUNDED', 124, 1, N'CARD NOT FUNDED (10001-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 573, N'991-1 DEAD AIR', 130, 1, N'DEAD AIR (991-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 574, N'10001-6 SPLIT TENDER', 124, 1, N'SPLIT TENDER (10001-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 575, N'10000-7 CARD LIMIT', 128, 1, N'CARD LIMIT (10000-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 576, N'997-8 REPL NOT RECVD', 125, 1, N'REPL NOT RECVD (997-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 577, N'10000-1 DENIED TRANSACTION', 128, 1, N'DENIED TRANSACTION (10000-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 578, N'994-4 LAW ENFORCEMENT CALL', 126, 1, N'LAW ENFORCEMENT CALL (994-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 579, N'990-1 DO NOT USE', 129, 1, N'DO NOT USE (990-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 580, N'996-6 CONSUMED CARD', 123, 1, N'CONSUMED CARD (996-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 581, N'500-3 TESTONE WRKGRP ADMIN', 131, 1, N'TESTONE WRKGRP ADMIN (500-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 582, N'946-5 WALMART.COM CONSUMED', 134, 0, N'WALMART.COM CONSUMED (946-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 583, N'937-6 SPLIT TENDER', 137, 1, N'SPLIT TENDER (937-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 584, N'937-7 CARD NOT IN GC', 137, 1, N'CARD NOT IN GC (937-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 585, N'937-2 PIN RESET QUESTION', 137, 1, N'PIN RESET QUESTION (937-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 586, N'945-2 7TH MONTH FEE INQUIRY', 133, 1, N'7TH MONTH FEE INQUIRY (945-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 587, N'946-1 BAD CREDIT STATUS', 134, 1, N'BAD CREDIT STATUS (946-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 588, N'938-7 CARD LIMIT', 139, 1, N'CARD LIMIT (938-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 589, N'938-5 IS CARD ACTIVE?', 139, 1, N'IS CARD ACTIVE? (938-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 590, N'946-3 CARD ACTIVE IN FCMS; CONSUMED IN GREENCARD', 134, 0,
      N'CARD ACTIVE IN FCMS; CONSUMED IN GREENCARD (946-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 591, N'943-4 MERCHANT REQUESTING CARD DEACTIVATION', 135, 1, N'MERCHANT REQUESTING CARD DEACTIVATION (943-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 592, N'944-4 LAW ENFORCEMENT CALL', 136, 1, N'LAW ENFORCEMENT CALL (944-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 593, N'937-12 ATM-CASH BACK', 137, 1, N'ATM-CASH BACK (937-12)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 594, N'937-9 DELAYED REDEMPTION', 137, 1, N'DELAYED REDEMPTION (937-9)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 595, N'945-4 REPLACEMENT CARD FEE', 133, 1, N'REPLACEMENT CARD FEE (945-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 596, N'937-10 CHANGE-UPDATE ZIP CODE', 137, 1, N'CHANGE-UPDATE ZIP CODE (937-10)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 597, N'943-3 CUSTOMER REQUESTING REFUND', 135, 1, N'CUSTOMER REQUESTING REFUND (943-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 598, N'937-8 PENDING PREAUTH', 137, 1, N'PENDING PREAUTH (937-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 599, N'939-2 TITANIUM VISA', 140, 1, N'TITANIUM VISA (939-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 600, N'938-6 BALANCE', 139, 1, N'BALANCE (938-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 601, N'947-7 REPL NOT RECVD', 138, 1, N'REPL NOT RECVD (947-7)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 602, N'938-2 PREAUTH RELEASE', 139, 1, N'PREAUTH RELEASE (938-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 603, N'937-11 RECURRING BILLING', 137, 1, N'RECURRING BILLING (937-11)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 604, N'940-2 DROPPED CALL', 132, 1, N'DROPPED CALL (940-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 605, N'944-5 DISPUTE', 136, 1, N'DISPUTE (944-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 606, N'937-1 ZIP CODE NOT ADDED', 137, 1, N'ZIP CODE NOT ADDED (937-1)', 0 )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 607, N'940-1 DEAD AIR', 132, 1, N'DEAD AIR (940-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 608, N'940-3 SYSTEM DOWN', 132, 1, N'SYSTEM DOWN (940-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 609, N'947-8 STOLEN CARD', 138, 1, N'STOLEN CARD (947-8)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 610, N'938-4 FEES', 139, 1, N'FEES (938-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 611, N'947-1 EXPIRED CARD', 138, 1, N'EXPIRED CARD (947-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 612, N'944-1 CARD IN FRAUD STATUS, REFERRED TO COMPLIANCE', 136, 1,
      N'CARD IN FRAUD STATUS, REFERRED TO COMPLIANCE (944-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 613, N'937-5 CARD NOT FUNDED', 137, 1, N'CARD NOT FUNDED (937-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 614, N'945-3 13TH MONTH FEE INQUIRY', 133, 1, N'13TH MONTH FEE INQUIRY (945-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 615, N'943-1 CARD IN CONSUMED STATUS', 135, 0, N'CARD IN CONSUMED STATUS (943-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 616, N'943-5 BULK ORDER REQUEST', 135, 1, N'BULK ORDER REQUEST (943-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 617, N'10001-0 INTERNATIONAL DECLINE', 124, 1, N'INTERNATIONAL DECLINE (10001-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 618, N'947-6 LOST CARD', 138, 1, N'LOST CARD (947-6)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 619, N'937-4 GAS PARTIAL PREAUTH', 137, 1, N'GAS PARTIAL PREAUTH (937-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 620, N'938-3 TRANS HISTORY', 139, 1, N'TRANS HISTORY (938-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 621, N'937-3 TOLERANCE LEVELS', 137, 1, N'TOLERANCE LEVELS (937-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 622, N'918-2 FASTCARD IVR DOWN', 142, 1, N'FASTCARD IVR DOWN (918-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 623, N'915-3 PIN CONVERSION', 143, 1, N'PIN CONVERSION (915-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 624, N'913-2 DROPPED CALL', 146, 1, N'DROPPED CALL (913-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 625, N'918-3 PRECARE DOWN', 142, 1, N'PRECARE DOWN (918-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 626, N'915-1 1ST CALL FOLLOWUP ON TROUBLE TICKET', 143, 1, N'1ST CALL FOLLOWUP ON TROUBLE TICKET (915-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 627, N'918-1 CARRIER IVR DOWN', 142, 1, N'CARRIER IVR DOWN (918-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 628, N'919-1 LOAD VALUE', 141, 1, N'LOAD VALUE (919-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 629, N'917-3 PIN REDEEMED TO WRONG NUMBER', 145, 1, N'PIN REDEEMED TO WRONG NUMBER (917-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 630, N'917-5 CUSTOMER LOST RECEIPT', 145, 1, N'CUSTOMER LOST RECEIPT (917-5)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 631, N'913-1 DEAD AIR', 146, 1, N'DEAD AIR (913-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 632, N'919-2 CHECK PIN STATUS', 141, 1, N'CHECK PIN STATUS (919-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 633, N'917-1 PIN ALREADY REDEEMED', 145, 1, N'PIN ALREADY REDEEMED (917-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 634, N'917-4 PIN NOT ACTIVATED', 145, 1, N'PIN NOT ACTIVATED (917-4)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 635, N'919-3 PIN CONSUMPTION', 141, 1, N'PIN CONSUMPTION (919-3)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 636, N'916-1 INACTIVE PHONE', 144, 1, N'INACTIVE PHONE (916-1)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 637, N'917-2 INCORRECT PIN', 145, 1, N'INCORRECT PIN (917-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 638, N'916-2 CUSTOMER CHOSE WRONG CARRIER', 144, 1, N'CUSTOMER CHOSE WRONG CARRIER (916-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 639, N'915-2 2ND CALL FOLLOW UP ON TROUBLE TICKET', 143, 1, N'2ND CALL FOLLOW UP ON TROUBLE TICKET (915-2)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 640, N'7505-0 Accounting Issue', 147, 1, N'Accounting Issue (7505-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 641, N'7520-0 Terminal Replacement', 148, 1, N'Terminal Replacement (7520-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 642, N'7525-0 Wireless VLD PIN Issue', 149, 1, N'Wireless VLD PIN Issue (7525-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 643, N'REMOVE - 7530-0 Content/Gift/LD Card Issue', NULL, 0, N'REMOVE - Content/Gift/LD Card Issue (7530-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 644, N'7535-0 Shell AirMiles', 151, 1, N'Shell AirMiles (7535-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 645, N'7540-0 Terminal Support', 152, 1, N'Terminal Support (7540-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 646, N'8000-0 Vanilla Card Issues', 153, 1, N'Vanilla Card Issues (8000-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 647, N'8010-0 Vanilla Card Declined', 154, 1, N'Vanilla Card Declined (8010-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 648, N'8020-0 Vanilla Card Balance', 155, 1, N'Vanilla Card Balance (8020-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 649, N'8030-0 Vanilla Card Registration', 156, 1, N'Vanilla Card Registration (8030-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 650, N'8040-0 Vanilla Card General Questions', 157, 1, N'Vanilla Card General Questions (8040-0)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 651, N'9000 Outage', NULL, 0, N'9000 Outage', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 652, N'NS', 159, 1, N'Auto-Wrapped: Not Specified', 1 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 653, N'50-2 CCA Merchant Inventory', 12, 1, N'CCA Merchant Inventory', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 654, N'970-1 B2B Activation', 665, 1, N'B2B Activation (970-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 655, N'970-2 Successful Activation', 665, 1, N'Successful Activation (970-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 656, N'970-3 Not Activated', 665, 1, N'Not Activated (970-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 657, N'970-4 Incorrect PIN (JIRA)', 665, 1, N'Incorrect PIN (JIRA) (970-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 658, N'970-5 My Vanilla Call', 665, 1, N'My Vanilla Call (970-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 659, N'970-6 Fees', 665, 1, N'Fees (970-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 660, N'970-7 Balance', 665, 1, N'Balance (970-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 661, N'970-8 Transaction History', 665, 1, N'Transaction History (970-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 662, N'778-1 Order Status', NULL, 1, N'778-1 Order Status', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 663, N'778-2 Order Not Received', NULL, 1, N'778-2 Order Not Received', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 664, N'778-3 Resend Order Email', NULL, 1, N'778-3 Resend Order Email', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 666, N'779-1 Cancel Order', NULL, 1, N'779-1 Cancel Order', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 667, N'779-2 Change Shipping Method', NULL, 1, N'779-2 Change Shipping Method', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 668, N'779-3 Change Payment Method', NULL, 1, N'779-3 Change Payment Method', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 669, N'779-4 Change Shipping Address', NULL, 1, N'779-4 Change Shipping Address', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 670, N'779-5 Change Order Email Address', NULL, 1, N'779-5 Change Order Email Address', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 671, N'780-1 Activate Card', NULL, 1, N'780-1 Activate Card', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 672, N'780-2 Card Features', NULL, 1, N'780-2 Card Features', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 673, N'781-1 Dead Air', NULL, 1, N'781-1 Dead Air', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 674, N'781-2 GIVEVANILLAGIFT.COM IS DOWN', NULL, 1, N'781-2 GIVEVANILLAGIFT.COM IS DOWN', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 675, N'950-1 DO NOT USE', 735, 1, N'DO NOT USE (950-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 676, N'950-2 DROPPED CALL', 735, 1, N'DROPPED CALL (950-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 677, N'951-1 DEAD AIR', 736, 1, N'DEAD AIR (951-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 678, N'952-1 FIRST JIRA FOLLOW UP', 737, 1, N'FIRST JIRA FOLLOW UP (952-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 679, N'952-2 SECOND JIRA FOLLOW UP', 737, 1, N'SECOND JIRA FOLLOW UP (952-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 680, N'953-1 CARD NOT ACTIVATED', 740, 1, N'CARD NOT ACTIVATED (953-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 681, N'953-2 CUSTOMER REQUESTING REFUND', 740, 1, N'CUSTOMER REQUESTING REFUND (953-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 682, N'953-3 MERCHANT REQUESTING DEACTIVATION', 740, 1, N'MERCHANT REQUESTING DEACTIVATION (953-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 683, N'953-4 BULK ORDER REQUEST', 740, 1, N'BULK ORDER REQUEST (953-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 684, N'953-5 ADD TO AUTHORIZED VENDOR LIST', 740, 1, N'ADD TO AUTHORIZED VENDOR LIST (953-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 685, N'954-1 CARD IN FRAUD STATUS', 741, 1, N'CARD IN FRAUD STATUS (954-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 686, N'954-2 DISPUTED CHARGES NO PACKET SENT', 741, 1, N'DISPUTED CHARGES NO PACKET SENT (954-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 687, N'954-3 DISPUTED CHARGES PACKET SENT', 741, 1, N'DISPUTED CHARGES PACKET SENT (954-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 688, N'954-4 LAW ENFORCEMENT CALL', 741, 1, N'LAW ENFORCEMENT CALL (954-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 689, N'955-1 FEE INQUIRY', 742, 1, N'FEE INQUIRY (955-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 690, N'955-2 REPLACEMENT FEE', 742, 1, N'REPLACEMENT FEE (955-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 691, N'956-1 BAD CREDIT', 743, 1, N'956-1 BAD CREDIT', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 692, N'956-2 CARD NOT ACTIVATED BY MERCHANT', 743, 1, N'CARD NOT ACTIVATED BY MERCHANT (956-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 693, N'956-3 CONSUMED CARD', 743, 1, N'CONSUMED CARD (956-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 694, N'957-1 EXPIRED CARD', 744, 1, N'EXPIRED CARD (957-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 695, N'957-2 REPLACEMENT NOT RECIEVED', 744, 1, N'REPLACEMENT NOT RECEIVED (957-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 696, N'958-1 ONLINE USE', 745, 1, N'ONLINE USE (958-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 697, N'958-2 USED AS DEBIT VS CREDIT', 745, 1, N'USED AS DEBIT VS CREDIT (958-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 698, N'958-3 CUSTOMER WANTS LOCATION ADDED AS AUTHORIZED', 745, 1,
      N'CUSTOMER WANTS LOCATION ADDED AS AUTHORIZED (958-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 699, N'959-1 BALANCE INQUIRY', 746, 1, N'BALANCE INQUIRY (959-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 700, N'959-2 CARD LIMIT', 746, 1, N'CARD LIMIT (959-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 701, N'959-3 DENIED TRANSACTION', 746, 1, N'DENIED TRANSACTION (959-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 702, N'959-4 PREAUTHORIZATION', 746, 1, N'PREAUTHORIZATION (959-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 703, N'959-5 PREAUTH RELEASE', 746, 1, N'PREAUTH RELEASE (959-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 704, N'959-6 TRANSACTION HISTORY', 746, 1, N'TRANSACTION HISTORY (959-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 705, N'959-7 NEXTWORTH DO NOT USE', 746, 1, N'NEXTWORTH DO NOT USE (959-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 706, N'959-8 NEXTWORTH DROPPED CALL', 746, 1, N'NEXTWORTH DROPPED CALL (959-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 707, N'959-9 NEXTWORTH DEAD AIR', 746, 1, N'NEXTWORTH DEAD AIR (959-9)', NULL )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 708, N'959-10 NEXTWORTH FIRST JIRA FOLLOW UP', 746, 1, N'NEXTWORTH FIRST JIRA FOLLOW UP (959-10)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 709, N'959-11 NEXTWORTH SECOND JIRA FOLLOW UP', 746, 1, N'NEXTWORTH SECOND JIRA FOLLOW UP (959-11)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 710, N'959-12 NEXTWORTH CARD NOT ACTIVATED', 746, 1, N'NEXTWORTH CARD NOT ACTIVATED (959-12)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 711, N'959-13 NEXTWORTH CUSTOMER REQUESTING REFUND', 746, 1, N'NEXTWORTH CUSTOMER REQUESTING REFUND (959-13)',
      NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 712, N'959-14 NEXTWORTH MERCHANT REQUESTING DEACTIVATION', 746, 1,
      N'NEXTWORTH MERCHANT REQUESTING DEACTIVATION (959-14)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 713, N'959-15 NEXTWORTH BULK ORDER REQUEST', 746, 1, N'NEXTWORTH BULK ORDER REQUEST (959-15)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 714, N'959-16 NEXTWORTH ADD TO AUTHORIZED VENDOR LIST', 746, 1,
      N'NEXTWORTH ADD TO AUTHORIZED VENDOR LIST (959-16)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 715, N'959-17 NEXTWORTH CARD IN FRAUD STATUS', 746, 1, N'NEXTWORTH CARD IN FRAUD STATUS (959-17)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 716, N'959-18 NEXTWORTH DISPUTED CHARGES NO PACKET SENT', 746, 1,
      N'NEXTWORTH DISPUTED CHARGES NO PACKET SENT (959-18)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 717, N'959-19 NEXTWORTH DISPUTED CHARGES PACKET SENT', 746, 1, N'NEXTWORTH DISPUTED CHARGES PACKET SENT (959-19)',
      NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 718, N'959-20 NEXTWORTH LAW ENFORCEMENT CALL', 746, 1, N'NEXTWORTH LAW ENFORCEMENT CALL (959-20)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 719, N'959-21 NEXTWORTH FEE INQUIRY', 746, 1, N'NEXTWORTH FEE INQUIRY (959-21)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 720, N'959-22 NEXTWORTH REPLACEMENT FEE', 746, 1, N'NEXTWORTH REPLACEMENT FEE (959-22)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 721, N'959-23 NEXTWORTH BAD CREDIT', 746, 1, N'NEXTWORTH BAD CREDIT (959-23)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 722, N'959-24 NEXTWORTH CARD NOT ACTIVATED BY MERCHANT', 746, 1,
      N'NEXTWORTH CARD NOT ACTIVATED BY MERCHANT (959-24)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 723, N'959-25 NEXTWORTH CONSUMED CARD', 746, 1, N'NEXTWORTH CONSUMED CARD (959-25)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 724, N'959-26 NEXTWORTH EXPIRED CARD', 746, 1, N'NEXTWORTH EXPIRED CARD (959-26)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 725, N'959-27 NEXTWORTH REPLACEMENT NOT RECEIVED', 746, 1, N'NEXTWORTH REPLACEMENT NOT RECEIVED (959-27)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 726, N'959-28 NEXTWORTH ONLINE USE', 746, 1, N'NEXTWORTH ONLINE USE (959-28)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 727, N'959-29 NEXTWORTH USED AS BAD CREDUIT VS CREDIT', 746, 1,
      N'NEXTWORTH USED AS BAD CREDIT VS CREDIT (959-29)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 728, N'959-30 NEXTWORTH BALANCE INQUIRY', 746, 1, N'NEXTWORTH BALANCE INQUIRY (959-30)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 729, N'959-31 NEXTWORTH CARD LIMIT', 746, 1, N'NEXTWORTH CARD LIMIT (959-31)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 730, N'959-32 NEXTWORTH DENIED TRANSACTION', 746, 1, N'NEXTWORTH DENIED TRANSACTION (959-32)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 731, N'959-33 NEXTWORTH PREAUTHORIZATION', 746, 1, N'NEXTWORTH PREAUTHORIZATION (959-33)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 732, N'959-34 NEXTWORTH PREAUTH RELEASE', 746, 1, N'NEXTWORTH PREAUTH RELEASE (959-34)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 733, N'959-35 NEXTWORTH TRANSACTION HISTORY', 746, 1, N'NEXTWORTH TRANSACTION HISTORY (959-35)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 734, N'937-13 INTERNATIONAL DECLINE', 137, 1, N'INTERNATIONAL DECLINE (937-13)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 738, N'7510-0 ORDER', 739, 1, N'ORDER (7510-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 747, N'858-1 CARD NOT ACTIVATED', NULL, 1, N'CARD NOT ACTIVATED (858-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 748, N'858-2 REFUND AT STORE', NULL, 1, N'REFUND AT STORE (858-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 749, N'858-3 CARD NOT WORKING', NULL, 1, N'CARD NOT WORKING (858-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 750, N'General Research', 5, 1, N'General Research', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 751, N'7532-0 H2H INC Product Support', NULL, 1, N'H2H INC Product Support (7532-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 752, N'8065-0 H2H Fraud Escalation', 769, 1, N'H2H Fraud Escalation (8065-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 753, N'7530-0 Content/Gift/LD Card Issues', 756, 1, N'Content/Gift/LD Card Issues (7530-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 754, N'8700-1 7-11 Prod-Terminal Issue', 755, 1, N'7-11 Prod-Terminal Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 758, N'NEW 0727', NULL, 1, N'NEW 0727', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 760, N'15000', NULL, 1, N'15000 TEST', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 761, N'924-3 SPENDING LIMITS', 121, 1, N'SPENDING LIMITS (924-3 )', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 762, N'924-4 BALANCE LIMITS', 121, 1, N'BALANCE LIMITS (924-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 763, N'925-6 DISPUTES', 120, 1, N'DISPUTES (925-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 764, N'929-2 NON-STRIPES MERCHANT', 118, 1, N'NON-STRIPES MERCHANT (929-2 )', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 765, N'929-4 BALANCE INQUIRY', 118, 1, N'BALANCE INQUIRY (929-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 766, N'929-5 FRAUD WATCH', 118, 1, N'FRAUD WATCH (929-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 767, N'929-6 TRIED AS DEBIT', 118, 1, N'TRIED AS DEBIT (929-6 )', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 768, N'929-7 TRIED AT ATM', 118, 1, N'TRIED AT ATME (929-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 770, N'8045-0 Vanilla Card Fraud Watch', 771, 1, N'Vanilla Fraud Watch (8045-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 772, N'EMPTY', NULL, 0, N'EMPTY', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 773, N'7550-0 JC H2H Support (Product)', 776, 1, N'JC H2H Support (Product)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 774, N'7545-0 SDM H2H Support -Product', 775, 1, N'SDM H2H Support (Product)', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 777, N'812-15 DAMAGED PIN', 861, 1, N'DAMAGED PIN (812-15)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 778, N'852-6 PAYPAL MYCASH DELAYED REDEMPTION', 63, 1, N'PAYPAL MY CASH DELAYED REDEMPTION (852-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 779, N'9005-1 Call Dropped or Call Issue', 780, 1, N'Call Dropped or Call Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 781, N'852-7 NOT A PAYPAL CALL', 63, 1, N'NOT A PAYPAL CALL (852-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 782, N'812-6 DROPPED CALL', 53, 1, N'DROPPED CALL (812-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 783, N'924-5 BALANCE INQUIRY', 121, 1, N'BALANCE INQUIRY (924-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 784, N'924-6 IS IT ACTIVE?', 121, 1, N'IS IT ACTIVE? (924-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 785, N'924-7 ADD A PIN', 121, 1, N'ADD A PIN (924-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 786, N'924-8 TRANS HISTORY', 121, 1, N'TRANS HISTORY (924-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 787, N'924-9 REDEEM PROMO CODE', 121, 1, N'REDEEM PROMO CODE (924-9)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 788, N'924-10 ALREADY REDEEMED', 121, 1, N'ALREADY REDEEMED (924-10)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 789, N'924-14 CARD NOT RECEIVED-REPLACEMENT ORDERED', 121, 1, N'CARD NOT RECEIVED-REPLACEMENT ORDERED (924-14)',
      NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 790, N'924-15 CARD NOT RECEIVED-REFERRED TO MERCHANT', 121, 1, N'CARD NOT RECEIVED-REFERRED TO MERCHANT (924-15)',
      NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 791, N'924-13 MAIL IN CODE', 121, 1, N'MAIL IN CODE (924-13)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 792, N'929-8 CARD NOT ACTIVE', 118, 1, N'CARD NOT ACTIVE (929-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 793, N'929-9 USED WITH WRONG MERCHANT TYPE', 118, 1, N'USED WITH WRONG MERCHANT TYPE (929-9)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 794, N'929-10 INCORRECT PIN', 118, 1, N'INCORRECT PIN (929-10)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 795, N'7505-1 Accounting Issue Invoice Req', 147, 1, N'Accounting Issue - Invoice Req (7505-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 796, N'7505-2 Accounting Issue Billing Inq', 147, 1, N'Accounting Issue - Billing Inq (7505-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 797, N'7560-0 Vanilla Card Replacement Act', 798, 1, N'Vanilla Card Replacement Act (7560-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 800, N'FDG01 Package Tampering', NULL, 1, N'Package Tampering', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 801, N'FDG01 Activation Issue', NULL, 1, N'Activation Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 802, N'FDG01 Double Dipping', NULL, 1, N'Double Dipping', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 803, N'FDG02 Merchant Error-POS', NULL, 1, N'Merchant Error at POS', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 804, N'FDG01 Technical Error', NULL, 1, N'Technical Error', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 805, N'FDG01 Failed Reload', NULL, 1, N'Failed Reload', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 806, N'FDG01 Quick Kill', NULL, 1, N'Quick Kill', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 807, N'FDG01 Deactivation Requested', NULL, 1, N'Deactivation Requested', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 808, N'FDG02  Tampered Card', NULL, 1, N'Tampered Card', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 809, N'FDG02 Production Issue', NULL, 1, N'Production Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 810, N'FDG02 Fraudulent Card', NULL, 1, N'Fraudulent Card', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 811, N'FDG02 Non Fraudulent Replacement', NULL, 1, N'Non Fraudulent Replacement', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 812, N'FDG02 Compromised Card Replacement', NULL, 1, N'Compromised Card Replacement', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 813, N'FDG02 Package Tampering', NULL, 1, N'Package Tampering', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 814, N'FDG01 Merchant Error-POS', NULL, 1, N'Merchant Error-POS', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 815, N'FDG02 Technical Error', NULL, 1, N'Technical Error', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 816, N'FDG02 Employee Fraud', NULL, 1, N'Employee Fraud', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 817, N'FDG02 Retailer Fraud', NULL, 1, N'Retailer Fraud', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 818, N'FDG02 Invalid Receipt', NULL, 1, N'Invalid Receipt', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 819, N'FDG02 Duplication', NULL, 1, N'Duplication', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 820, N'FDG02 Customer Refund at POS', NULL, 1, N'Customer Refund at POS', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 821, N'FDG02 Card not Activated at POS', NULL, 1, N'Card not Activated at POS', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 822, N'FDG02 Error Correction', NULL, 1, N'Error Correction', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 823, N'FDG02 Copied Card Mag', NULL, 1, N'Copied Card Mag', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 824, N'FDG03 Called Customer', NULL, 1, N'Called Customer', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 825, N'FDG03 Called Merchant', NULL, 1, N'Called Merchant', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 826, N'FDG03 Released Funds to Customer', NULL, 1, N'Released Funds to Customer', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 827, N'FDG03 Denied Release of Funds', NULL, 1, N'Denied Release of Funds', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 828, N'FDG03 Requested MRL', NULL, 1, N'Requested MRL', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 829, N'FDG04 Activation Issue', NULL, 1, N'Activation Issue', NULL )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 830, N'FDG04 Technical Issue', NULL, 1, N'Technical Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 831, N'FDG05 Law Enforcement', NULL, 1, N'Law Enforcement', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 832, N'FDG05 VRN Inactive', NULL, 1, N'VRN Inactive', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 833, N'FDG05 VRN Tampered Chit', NULL, 1, N'VRN Tampered Chit', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 834, N'FDG05 Subpoena Request', NULL, 1, N'Subpoena Request', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 835, N'FDG05 Forfeiture Request', NULL, 1, N'Forfeiture Request', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 836, N'FDG05 Victim Assisted Scam', NULL, 1, N'Victim Assisted Scam', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 837, N'FDG05 PayPal Inactive', NULL, 1, N'PayPal Inactive', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 838, N'FDG05 PayPal Damaged Pin', NULL, 1, N'PayPal Damaged Pin', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 839, N'FDG05 Fraudulent Chargeback Disputes', NULL, 1, N'Fraudulent Chargeback Disputes', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 840, N'FDG05 Escalation', NULL, 1, N'Escalation', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 841, N'FDG06 Phone Scam', NULL, 1, N'Phone Scam', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 842, N'FDG06 Bad Payment', NULL, 1, N'Bad Payment', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 843, N'FDG06 Employee Fraud', NULL, 1, N'Employee Fraud', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 844, N'FDG06 Card Swap at POS', NULL, 1, N'Card Swap at POS', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 845, N'FDG06 Package Tampering', NULL, 1, N'Package Tampering', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 846, N'FDG06 Non Payment', NULL, 1, N'Non Payment', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 847, N'FDG06 Activation Issue', NULL, 1, N'Activation Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 848, N'FDG06 Escalation', NULL, 1, N'Escalation', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 849, N'FDG06 TMS', NULL, 1, N'TMS', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 850, N'FDG07 Credit Request', NULL, 1, N'Credit Request', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 851, N'FDG07 Consumer Request', NULL, 1, N'Consumer Request', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 852, N'FDG07 Merchant Request', NULL, 1, N'Merchant Request', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 853, N'FDG07 Billing Issues', NULL, 1, N'Billing Issues', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 854, N'FDG07 Technical Issue', NULL, 1, N'Technical Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 855, N'7570-0 MyVanilla Support', 858, 1, N'MyVanilla Support (7570-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 856, N'7575-0 MyVanilla Card Registration', 859, 1, N'MyVanilla Card Registration (7575-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 857, N'7580-0 MyVanilla Refunds', 860, 1, N'MyVanilla Refunds (7580-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 862, N'7585-0 VRN PIN Issue', 868, 1, N'VRN PIN Issue (7585-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 864, N'7586-0 VRN PIN Refund Req (MERCHANT)', 869, 1, N'VRN PIN Refund Req (MERCHANT)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 865, N'7587-0 VRN PIN Refund Req (CUSTOMER)', 870, 1, N'VRN PIN Refund Req (CUSTOMER)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 866, N'9000 OUTAGE', 158, 1, N'OUTAGE (9000)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 867, N'9005-0 Call Issues/Dropped ***DUPLICATE***', NULL, 0, N'Call Issues/Dropped (9005-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 871, N'8050-1 Vanilla Fee Questions or Reversal Request', 872, 1, N'Vanilla Fee Questions or Reversal Request',
      NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 874, N'8055-0 Vanilla Pre-Auth', 873, 1, N'Vanilla Pre-Auth (8055-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 875, N'8060-0 Vanilla Chargeback', 876, 1, N'Vanilla Chargeback (8060-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 877, N'9010-0 ICT Support Transition', 878, 1, N'ICT Support Transition (9010-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 879, N'889-12 GAS PUMP DECLINED', 82, 1, N'GAS PUMP DECLINED (889-12)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 880, N'889-13 GAS PUMP GOT GAS', 82, 1, N'GAS PUMP GOT GAS (889-13)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 881, N'852-8 PAYPAL NON MY CASH LOAD ISSUE', 63, 1, N'PAYPAL NON MY CASH LOAD ISSUE (852-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 882, N'10-3 Pin Needed - Receipt Not Legible - Lost Pin', NULL, 1,
      N'PIN Needed - Receipt Not Legible - Lost PIN (10-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 883, N'50-3 CCA Card Balance', 12, 1, N'Card Balance', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 884, N'50-4 CCA Pin Reset', 12, 1, N'PIN Reset', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 885, N'50-5 CCA Card Fees', 12, 1, N'Card Fees', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 886, N'7590-0 Transfer from Fraud', NULL, 1, N'Transfer from Fraud', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 887, N'7530-0 Content-Gift-LD Card Issue', NULL, 1, N'Content-Gift-LD Card Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 888, N'974-14 Invalid CVV', 79, 1, N'Invalid CVV (974-14)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 889, N'982-1 Card in Fraud Status; referred to Compliance', NULL, 0,
      N'Card in Fraud Status; referred to Compliance (982-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 890, N'807-9 MYVANILLA PIN FAILED TO LOAD', 52, 1, N'MYVANILLA PIN FAILED TO LOAD (807-9)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 891, N'812-16 SUBMIT REFUND', 53, 1, N'SUBMIT REFUND (812-16)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 892, N'812-17 REFUND UPDATE', 53, 1, N'REFUND UPDATE (812-17)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 893, N'812-18 FILE DISPUTE', 53, 1, N'FILE DISPUTE (812-18)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 894, N'812-19 DISPUTE UPDATE', 53, 1, N'DISPUTE UPDATE (812-19)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 895, N'812-20 DAMAGED PIN', 53, 1, N'DAMAGED PIN (812-20)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 896, N'7555-0 CT Production Issue', 897, 1, N'CT Production Issue', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 898, N'924-16 ACTIVATE CARD', 121, 1, N'ACTIVATE CARD (924-16)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 899, N'NS', 159, 1, N'Auto-Wrapped: Dropped Call', 1 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 900, N'782-1 DEAD AIR', 903, 1, N'DEAD AIR (782-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 901, N'783-1 CUSTOMER REQUESTING REFUND', 759, 1, N'CUSTOMER REQUESTING REFUND (783-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked]) VALUES
    ( 902, N'783-2 MERCHANT REQUESTING CARD DEACTIVATION', 759, 1, N'MERCHANT REQUESTING CARD DEACTIVATION (783-2)',
      NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 904, N'783-3 STOCK REFILL REQUEST', 759, 1, N'STOCK REFILL REQUEST (783-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 905, N'784-1 CARD IN HOT STATUS', 946, 1, N'CARD IN HOT STATUS (784-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 906, N'784-2 LAW ENFORCEMENT CALL', 946, 1, N'LAW ENFORCEMENT CALL (784-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 907, N'784-3 UNAUTHORIZED CALLER', 946, 1, N'UNAUTHORIZED CALLER (784-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 908, N'784-4 DISPUTE', 946, 1, N'DISPUTE (784-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 909, N'785-1 EXPIRED CARD', 947, 1, N'EXPIRED CARD (785-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 910, N'785-2 RENEWAL CARD', 947, 1, N'RENEWAL CARD (785-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 911, N'785-3 LOST/STOLEN', 947, 1, N'LOST/STOLEN (785-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 912, N'785-4 PREMIUM CARD NOT RECEIVED', 947, 1, N'PREMIUM CARD NOT RECEIVED (785-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 913, N'785-5 RETURNED MAIL', 947, 1, N'RETURNED MAIL (785-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 914, N'785-6 REPLACEMENT NOT RECVD', 947, 1, N'REPLACEMENT NOT RECVD (785-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 915, N'786-1 FAILED AVS', 948, 1, N'FAILED AVS (786-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 916, N'786-2 INCORRECT PIN', 948, 1, N'INCORRECT PIN (786-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 917, N'786-3 TOLERANCE', 948, 1, N'TOLERANCE (786-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 918, N'786-4 INSUFFICIENT FUNDS', 948, 1, N'INSUFFICIENT FUNDS (786-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 919, N'786-5 INCORRECT CVV', 948, 1, N'INCORRECT CVV (786-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 920, N'786-6 ACCOUNT LIMITS', 948, 1, N'ACCOUNT LIMITS (786-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 921, N'786-7 ATM DECLINE', 948, 1, N'ATM DECLINE (786-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 922, N'786-8 Decline Not In History', 948, 1, N'Decline Not In History (786-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 923, N'786-9 INVALID DATA DECLINE', 948, 1, N'INVALID DATA DECLINE (786-9)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 924, N'786-10 REVERSAL ISSUE', 948, 1, N'REVERSAL ISSUE (786-10)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 925, N'787-1 CARD BALANCE', 949, 1, N'CARD BALANCE (787-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 926, N'787-2 GAS PUMP PREAUTH', 949, 1, N'GAS PUMP PREAUTH (787-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 927, N'787-3 PREAUTH RELEASE', 949, 1, N'PREAUTH RELEASE (787-3)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 928, N'787-4 TRANSACTION HISTORY', 949, 1, N'TRANSACTION HISTORY (787-4)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 929, N'787-5 FEES', 949, 1, N'FEES (787-5)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 930, N'787-6 DIRECT DEPOSIT', 949, 1, N'DIRECT DEPOSIT (787-6)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 931, N'787-7 CARD TO CARD', 949, 1, N'CARD TO CARD (787-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 932, N'787-8 VRN RELOAD', 949, 1, N'VRN RELOAD (787-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 933, N'787-9 SEND DD FORM', 949, 1, N'SEND DD FORM (787-9)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 934, N'787-10 SEND ACCT STATEMNT', 949, 1, N'SEND ACCT STATEMNT (787-10)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 935, N'787-11 ADD/EDIT ALERTS', 949, 1, N'ADD/EDIT ALERTS (787-11)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 936, N'787-12 UPDATE ACCT INFO', 949, 1, N'UPDATE ACCT INFO (787-12)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 937, N'787-14 Change PIN', 949, 1, N'Change PIN (787-14)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 938, N'787-15 Mobile App Not Working', 949, 1, N'Mobile App Not Working (787-15)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 939, N'787-16 Mobile App Login Assistance', 949, 1, N'Mobile App Login Assistance (787-16)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 940, N'787-17 NEG BAL WRITE OFF', 949, 1, N'NEG BAL WRITE OFF (787-17)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 941, N'788-1 FRAUD REFUND', 950, 1, N'FRAUD REFUND (788-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 942, N'788-2 PRODUCT DISSATISFACTION', 950, 1, N'PRODUCT DISSATISFACTION (788-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 943, N'788-3 DISPUTE', 950, 1, N'DISPUTE (788-3)', NULL )
GO
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 944, N'789-1 FAILED ONLINE', 951, 1, N'FAILED ONLINE (789-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 945, N'789-2 ACTIVATE GPR CARD', 951, 1, N'ACTIVATE GPR CARD (789-2)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 952, N'929-11 PREAUTH PENDING', NULL, 1, N'PREAUTH PENDING (929-11)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 953, N'929-12 TOLERENCE', NULL, 1, N'TOLERENCE (929-12)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 954, N'929-13 PIN RESET', NULL, 1, N'PIN RESET (929-13)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 955, N'925-7 FUNDS SWEPT', 120, 1, N'FUNDS SWEPT (925-7)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 956, N'925-8 WRONG CARD ORDERED', 120, 1, N'WRONG CARD ORDERED (925-8)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 957, N'9050-0 GPR Instant PIN Check', 959, 1, N'GPR Instant PIN Check (9050-0)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 958, N'9050-1 General Financials Call', 959, 1, N'General Financials Call (9050-1)', NULL )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 969, N'FRD_APPROVED', 970, 1, N'Approved', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 970, N'FRD_DENIED', 971, 1, N'Denied', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 971, N'FRD_EMPLOYEE_FRAUD', 972, 1, N'Employee Fraud', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 972, N'FRD_TECHNICAL_ISSUES', 973, 1, N'Technical Issues', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 973, N'FRD_CARD_SWAP_AT_POS', 974, 1, N'Card Swap at POS', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 974, N'FRD_CARD_TAMPERING', 975, 1, N'Card Tampering', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 975, N'FRD_ACTIVATION_ISSUE', 976, 1, N'Activation Issue', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 976, N'FRD_VICTIM_ASSISTED_FRAUD', 977, 1, N'Victim-Assisted Fraud', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 977, N'FRD_WHITELISTED', 978, 1, N'Whitelisted', 0 )
INSERT [dbo].[wrap_up_code] ([id], [i3_name], [wrap_up_code_category_id], [active], [display_name], [locked])
VALUES ( 978, N'FRD_BLACKLISTED', 979, 1, N'Blacklisted', 0 )
SET IDENTITY_INSERT [dbo].[wrap_up_code] OFF
SET IDENTITY_INSERT [dbo].[wrap_up_code_category] ON

INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 0, N'No Queue - Legacy', 0, N'No Queue - Legacy' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name]) VALUES ( 5, N'General', 1, N'General' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 6, N'180 ICT', 1, N'ICT (180)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 7, N'150 CIRCLE K - EPAY', 1, N'CIRCLE K - EPAY (150)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 8, N'40 Card Issue', 1, N'Card Issue (40)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 9, N'70 Product Orders', 1, N'Product Orders (70)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 10, N'80 Sales', 1, N'Sales (80)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 11, N'140 EPAY - Norcross', 1, N'EPAY - Norcross (140)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 12, N'50 Call Center Application', 1, N'Fraud (50)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 13, N'830 WIRELESS - AT&T', 1, N'WIRELESS - AT&T (830)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 14, N'824 WIRELESS - TRUMPET', 1, N'WIRELESS - TRUMPET (824)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 15, N'825 WIRELESS - STI', 1, N'WIRELESS - STI (825)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 16, N'822 WIRELESS - READY MOBILE', 1, N'WIRELESS - READY MOBILE (822)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 17, N'832 WIRELESS - CRICKET', 1, N'WIRELESS - CRICKET (832)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 18, N'831 WIRELESS - CLARO', 1, N'WIRELESS - CLARO (831)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 19, N'823 WIRELESS - ZTAR', 1, N'WIRELESS - ZTAR (823)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 20, N'828 WIRELESS - NET10', 1, N'WIRELESS - NET10 (828)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 21, N'829 WIRELESS - LOCUS O2', 1, N'WIRELESS - LOCUS O2 (829)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 22, N'826 WIRELESS - MOVIDA', 1, N'WIRELESS - MOVIDA (826)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 23, N'827 WIRELESS - AIRLINK', 1, N'WIRELESS - AIRLINK (827)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 24, N'914 Merchant Call', 1, N'Merchant Call (914)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 25, N'838 WIRELESS - VIRGIN MOBILE', 1, N'WIRELESS - VIRGIN MOBILE (838)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 26, N'837 WIRELESS - VERIZON', 1, N'US Cellular (837)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 27, N'839 WIRELESS - BUZZ', 1, N'WIRELESS - BUZZ (839)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 28, N'923 WIRELESS - CALL ISSUE', 1, N'WIRELESS - CALL ISSUE (923)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 29, N'834 WIRELESS - I WIRELESS', 1, N'WIRELESS - I WIRELESS (834)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 30, N'820 LYCO', 1, N'LYCO (820)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 31, N'833 WIRELESS - ALLTEL', 1, N'WIRELESS - ALLTEL (833)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 32, N'836 WIRELESS - TRACFONE', 1, N'WIRELESS - TRACFONE (836)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 33, N'835 WIRELESS - TMOBILE', 1, N'WIRELESS - TMOBILE (835)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 34, N'190 Medagate', 1, N'Medagate (190)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 35, N'130 VTS', 1, N'VTS (130)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 36, N'20 Card Activation', 1, N'Terminal Troubleshooting (20)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name]) VALUES
    ( 37, N'10 Pre-Pin Credit Request - Paper Jam/Pin Didn''t Print', 1,
      N'Pre-Pin Credit Request - Paper Jam/Pin Didn''t Print (10)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 38, N'30 Billing/Invoice', 1, N'Billing/Invoice (30)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 39, N'60 AirTime', 1, N'AirTime (60)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 40, N'879 MIO - CARD ACTIVATION', 1, N'MIO - CARD ACTIVATION (879)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 41, N'877 MIO - CARD USAGE', 1, N'MIO - CARD USAGE (877)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 42, N'878 MIO - REFUND REQUEST', 1, N'MIO - REFUND REQUEST (878)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 43, N'799 MIO Issue', 1, N'MIO Issue (799)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 44, N'875 MIO - CARD REPLACEMENT', 1, N'MIO - CARD REPLACEMENT (875)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 45, N'876 MIO - CARD ISSUE', 1, N'MIO - CARD ISSUE (876)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 46, N'873 MIO - MERCHANT CALL', 1, N'MIO - MERCHANT CALL (873)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 47, N'874 MIO - COMPLIANCE', 1, N'MIO - COMPLIANCE (874)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 48, N'871 MIO - CALL ISSUE', 1, N'MIO - CALL ISSUE (871)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 49, N'872 MIO - SALES INQUIRY', 1, N'MIO - SALES INQUIRY (872)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 50, N'806 Mio VRN', 1, N'Mio VRN (806)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 51, N'811 PayPal MC VRN', 1, N'PayPal MC VRN (811)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 52, N'807 My Vanilla VRN', 1, N'My Vanilla VRN (807)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 53, N'812 Other VRN', 1, N'Other VRN (812)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 54, N'805 Momentum Reload', 1, N'NextCala (805)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 55, N'809 NetSpend VRN', 1, N'NetSpend VRN (809)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 56, N'808 Amex VRN', 1, N'Amex VRN (808)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 57, N'810 Momentum VRN', 1, N'Momentum VRN (810)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 58, N'885 MYVANILLA', 1, N'MYVANILLA (885)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 59, N'881 JAX CARE - MIO', 1, N'JAX CARE - MIO (881)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 60, N'882 JAX CARE - VANILLA', 1, N'JAX CARE - VANILLA (882)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 61, N'883 JAX CARE - WIRELESS/LD', 1, N'JAX CARE - WIRELESS/LD (883)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 62, N'850 PAYPAL-REDEMPTION', 1, N'PAYPAL-REDEMPTION (850)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 63, N'852 PAYPAL-PIN ISSUE', 1, N'PAYPAL-PIN ISSUE (852)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 64, N'851 PAYPAL-SYSTEM ISSUE', 1, N'PAYPAL-SYSTEM ISSUE (851)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 65, N'853 PAYPAL OTHER', 1, N'PAYPAL OTHER (853)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 66, N'110 Merchant needs to order product & supplies', 1, N'Merchant needs to order product & supplies (110)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 67, N'869 REDEMPTION', 1, N'REDEMPTION (869)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 68, N'868 SYSTEM ISSUE', 1, N'SYSTEM ISSUE (868)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 69, N'867 PIN ISSUE', 1, N'PIN ISSUE (867)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 70, N'866 OTHER', 1, N'OTHER (866)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 71, N'988 VISA - REFUND REQUEST', 1, N'VISA - REFUND REQUEST (988)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 72, N'978 VISA - CALL ISSUE', 1, N'VISA - CALL ISSUE (978)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 73, N'982 VISA - COMPLIANCE', 1, N'VISA - COMPLIANCE (982)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 74, N'981 VISA - MERCHANT CALL', 1, N'VISA - MERCHANT CALL (981)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 75, N'980 VISA - SALES INQUIRY', 1, N'VISA - SALES INQUIRY (980)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 76, N'985 VISA - CARD REPLACEMENT', 1, N'VISA - CARD REPLACEMENT (985)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 77, N'975 VISA - CARD BALANCE', 1, N'VISA - CARD BALANCE (975)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 78, N'984 VISA - CARD STATUS', 1, N'VISA - CARD STATUS (984)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 79, N'974 VISA - CARD DECLINED', 1, N'VISA - CARD DECLINED (974)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 80, N'890 TARGET - OTHER', 1, N'TARGET - OTHER (890)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 81, N'888 TARGET - CARD BALANCE', 1, N'TARGET - CARD BALANCE (888)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 82, N'889 TARGET - CARD DECLINED', 1, N'TARGET - CARD DECLINED (889)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 83, N'893 TARGET - MERCHANT CALL', 1, N'TARGET - MERCHANT CALL (893)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 84, N'894 TARGET - COMPLIANCE', 1, N'TARGET - COMPLIANCE (894)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 85, N'891 TARGET - JIRA', 1, N'TARGET - JIRA (891)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 86, N'892 TARGET - REFUND REQUEST', 1, N'TARGET - REFUND REQUEST (892)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 87, N'897 TARGET - CARD REPLACEMENT', 1, N'TARGET - CARD REPLACEMENT (897)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 88, N'895 TARGET - FEES', 1, N'TARGET - FEES (895)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 89, N'896 TARGET - CARD STATUS', 1, N'TARGET - CARD STATUS (896)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 90, N'790 MY VANILLA- CARD ACTIVATION', 1, N'MY VANILLA- CARD ACTIVATION (790)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 91, N'791 MY VANILLA- REFUND REQUEST', 1, N'MY VANILLA- REFUND REQUEST (791)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 92, N'798 MY VANILLA- DEAD AIR', 1, N'MY VANILLA- DEAD AIR (798)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 93, N'797 MY VANILLA- SALES INQUIRY', 1, N'MY VANILLA- SALES INQUIRY (797)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 94, N'796 MY VANILLA- MERCHANT CALL', 1, N'MY VANILLA- MERCHANT CALL (796)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 95, N'795 MY VANILLA- COMPLIANCE', 1, N'MY VANILLA- COMPLIANCE (795)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 96, N'794 MY VANILA- CARD REPLACEMENT', 1, N'MY VANILA- CARD REPLACEMENT (794)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 97, N'793 MY VANILLA- CARD DECLINED', 1, N'MY VANILLA- CARD DECLINED (793)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 98, N'792 MY VANILLA- CARD ACTIVITY', 1, N'MY VANILLA- CARD ACTIVITY (792)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 99, N'861 OPEN', 1, N'Other (861)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 100, N'864 OPEN', 1, N'Redemption (864)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 101, N'863 OPEN', 1, N'System Issue (863)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 102, N'862 OPEN', 1, N'PIN Issue (862)' )
GO
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 103, N'884 JAX CARE - MISCELLANEOUS', 1, N'JAX CARE - MISCELLANEOUS (884)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 104, N'880 JAX CARE - SYSTEMS', 1, N'JAX CARE - SYSTEMS (880)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 105, N'170 Gift Card', 1, N'Gift Card (170)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 106, N'908 LD - SYSTEM ISSUE', 1, N'LD - SYSTEM ISSUE (908)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 107, N'907 LD - CREDIT', 1, N'LD - CREDIT (907)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 108, N'909 LD - REDEMPTION', 1, N'LD - REDEMPTION (909)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 109, N'904 LD - MERCHANT CALL', 1, N'LD - MERCHANT CALL (904)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 110, N'903 LD - BELLSOUTH', 1, N'LD - BELLSOUTH (903)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 111, N'906 LD - CARRIER ISSUE', 1, N'LD - CARRIER ISSUE (906)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 112, N'905 LD - LIVETIME ISSUE', 1, N'LD - LIVETIME ISSUE (905)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 113, N'902 LD - CALL ISSUE', 1, N'LD - CALL ISSUE (902)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 114, N'901 LD - OTHER', 1, N'LD - OTHER (901)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 115, N'710 Holiday Walgreens', 1, N'Holiday Walgreens (710)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 116, N'700 Card Balance', 1, N'Card Balance (700)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 117, N'701 Card Declined', 1, N'Card Declined (701)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 118, N'929 CARD DECLINED', 1, N'CARD DECLINED (929)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 119, N'927 WIRELESS - PIN ISSUE', 1, N'WIRELESS - PIN ISSUE (927)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 120, N'925 CARD ISSUE', 1, N'CARD ISSUE (925)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 121, N'924 CARD USAGE', 1, N'CARD USAGE (924)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 122, N'160 Australia SVS', 1, N'Australia SVS (160)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 123, N'996 DISCOVER - CARD STATUS', 1, N'DISCOVER - CARD STATUS (996)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 124, N'10001 DISCOVER - CARD DECLINED', 1, N'DISCOVER - CARD DECLINED (10001)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 125, N'997 DISCOVER - CARD REPLACEMENT', 1, N'DISCOVER - CARD REPLACEMENT (997)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 126, N'994 DISCOVER - COMPLIANCE', 1, N'DISCOVER - COMPLIANCE (994)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 127, N'995 DISCOVER - FEES', 1, N'DISCOVER - FEES (995)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 128, N'10000 DISCOVER - CARD BALANCE', 1, N'DISCOVER - CARD BALANCE (10000)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 129, N'990 DISCOVER - OTHER', 1, N'DISCOVER - OTHER (990)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 130, N'991 DISCOVER - CALL ISSUE', 1, N'DISCOVER - CALL ISSUE (991)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 131, N'500 TEST - Account Code for TestOne', 1, N'TEST - Account Code for TestOne (500)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 132, N'940 MASTERCARD - CALL ISSUE', 1, N'MASTERCARD - CALL ISSUE (940)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 133, N'945 MASTERCARD - FEES', 1, N'MASTERCARD - FEES (945)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 134, N'946 MASTERCARD - CARD STATUS', 1, N'MASTERCARD - CARD STATUS (946)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 135, N'943 MASTERCARD - MERCHANT CALL', 1, N'MASTERCARD - MERCHANT CALL (943)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 136, N'944 MASTERCARD - COMPLIANCE', 1, N'MASTERCARD - COMPLIANCE (944)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 137, N'937 MASTERCARD - CARD DECLINED', 1, N'MASTERCARD - CARD DECLINED (937)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 138, N'947 MASTERCARD - CARD REPLACEMENT', 1, N'MASTERCARD - CARD REPLACEMENT (947)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 139, N'938 MASTERCARD - CARD BALANCE', 1, N'MASTERCARD - CARD BALANCE (938)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 140, N'939 MASTERCARD - OTHER', 1, N'MASTERCARD - OTHER (939)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 141, N'919 Redemption', 1, N'Redemption (919)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 142, N'918 System Issue', 1, N'System Issue (918)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 143, N'915 Livetime Issue', 1, N'Livetime Issue (915)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 144, N'916 Carrier Issue', 1, N'Carrier Issue (916)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 145, N'917 PIN Issue', 1, N'PIN Issue (917)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 146, N'913 Dropped Call', 1, N'Dropped Call (913)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 147, N'7505 Accounting Issue', 1, N'Accounting Issue (7505)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 148, N'7520 Terminal Replacement', 1, N'Terminal Replacement (7520)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 149, N'7525 WIRLESS/VLD PIN ISSUE', 1, N'Wireless VLD PIN Issue (7525)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 150, N'REMOVE - 7530 Content/Gift/LD Card Issue', 0, N'REMOVE - Content/Gift/LD Card Issue (7530)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 151, N'7535 Shell AirMiles', 1, N'Shell AirMiles (7535)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 152, N'7540 Terminal Support', 1, N'Terminal Support (7540)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 153, N'8000 Vanilla Issue', 1, N'Vanilla Card Issue' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 154, N'8010 Vanilla Card Declined', 1, N'Vanilla Card Declined (8010)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 155, N'8020 Vanilla Card Balance', 1, N'Vanilla Card Balance (8020)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 156, N'8030 Vanilla Card Registration', 1, N'Vanilla Card Registration (8030)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 157, N'8040 Vanilla Card General Questions', 1, N'Vanilla Card General Questions (8040)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 158, N'9000 Outage', 1, N'Outage (9000)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 159, N'Auto-Wrapped', 1, N'Auto-Wrapped' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 665, N'970 - B2B Activation', 1, N'B2B Activation (970)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 735, N'950 DISCOVER RAN-OTHER', 1, N'DISCOVER RAN-OTHER (950)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 736, N'951 DISCOVER RAN-CALL ISSUE', 1, N'DISCOVER RAN-CALL ISSUE (951)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 737, N'952 DISCOVER RAN-JIRA FOLLOW UP', 1, N'DISCOVER RAN-JIRA FOLLOW UP (952)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 739, N'7510 INQUIRY', 1, N'Order (7510)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 740, N'953 DISCOVER RAN-MERCHANT CALL', 1, N'DISCOVER RAN-MERCHANT CALL (953)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 741, N'954 DISCOVER RAN-COMPLIANCE', 1, N'DISCOVER RAN-COMPLIANCE (954)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 742, N'955 DISCOVER RAN-FEES', 1, N'DISCOVER RAN-FEES (955)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 743, N'956 DISCOVER RAN-CARD STATUS', 1, N'DISCOVER RAN-CARD STATUS (956)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 744, N'957 DISCOVER RAN-CARD REPLACEMENT', 1, N'DISCOVER RAN-CARD REPLACEMENT (957)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 745, N'958 DISCOVER RAN-CARD ISSUE', 1, N'DISCOVER RAN-CARD ISSUE (958)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 746, N'959 DISCOVER RAN-CARD USAGE', 1, N'DISCOVER RAN-CARD USAGE (959)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 755, N'7-11 Prod/Terminal Issue', 1, N'7-11 Prod/Terminal Issue' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 756, N'7530 Content/Gift/LD Card Issues', 1, N'Content/Gift/LD Card Issue (7530)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name]) VALUES ( 757, N'UNUSED', 0, N'UNUSED' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 759, N'783 MERCHANT CALLING', 1, N'MERCHANT CALLING (783)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 769, N'8065 H2H Fraud Escalation', 1, N'H2H Fraud Escalation (8065)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 771, N'8045 Vanilla Fraud Watch', 1, N'Vanilla Fraud Watch (8045)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 775, N'7545 SDM H2H Support (Product)', 1, N'SDM H2H Support (Product)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 776, N'7550 JC H2H Support (Product)', 1, N'JC H2H Support (Product)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 780, N'9005 Call Issues/Dropped', 1, N'Call Issues/Dropped (9005)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 798, N'7560 Vanilla Card Replacement Act', 1, N'Vanilla Card Replacement Act (7560)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 799, N'1001 US Consumed', 0, N'U.S. Consumed' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 858, N'7570 MyVanilla Support', 1, N'MyVanilla Support (7570)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 859, N'7575 MyVanilla Card Registration', 1, N'MyVanilla Card Registration (7575)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 860, N'7580 MyVanilla Refunds', 1, N'MyVanilla Refunds (7580)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 861, N'812 PayPal VRN', 1, N'PayPal VRN (812)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 863, N'7585 CDVRN_FR', 0, N'CDVRN_FR' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 868, N'7585 VRN PIN Issue', 1, N'VRN PIN Issue' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 869, N'7586 VRN PIN Refund Req (MERCHANT)', 1, N'VRN PIN Refund Req (MERCHANT)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 870, N'7587 VRN PIN Refund Req (CUSTOMER)', 1, N'VRN PIN Refund Req (CUSTOMER)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 872, N'8050 Vanilla Fee Questions/Reversal', 1, N'Vanilla Fee Questions/Reversal (8050)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 873, N'8055 Vanilla Pre-Auth', 1, N'Vanilla Pre-Auth (8055)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 876, N'8060 Vanilla Chargeback', 1, N'Vanilla Chargeback (8060)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 878, N'9010 ICT Support Transition', 1, N'ICT Support Transition (9010)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 897, N'7555 CT Production Issue', 1, N'CT Production Issue' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 903, N'782 DEAD AIR', 1, N'DEAD AIR (782)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 946, N'784 COMPLIANCE', 1, N'COMPLIANCE (784)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 947, N'785 CARD REPLACEMENT', 1, N'CARD REPLACEMENT (785)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 948, N'786 CARD DECLINED', 1, N'CARD DECLINED (786)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 949, N'787 CARD ACTIVITY', 1, N'CARD ACTIVITY (787)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 950, N'788 REFUND REQUEST', 1, N'REFUND REQUEST (788)' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 951, N'789 CARD ACTIVATION', 1, N'CARD ACTIVATION (789)' )
GO
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 959, N'FINANCIALS_GPR', 1, N'FINANCIALS_GPR' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 970, N'FRD_APPROVED', 1, N'Approved' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 971, N'FRD_DENIED', 1, N'Denied' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 972, N'FRD_EMPLOYEE_FRAUD', 1, N'Employee Fraud' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 973, N'FRD_TECHNICAL_ISSUES', 1, N'Technical Issues' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 974, N'FRD_CARD_SWAP_AT_POS', 1, N'Card Swap at POS' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 975, N'FRD_CARD_TAMPERING', 1, N'Card Tampering' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 976, N'FRD_ACTIVATION_ISSUE', 1, N'Activation Issue' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 977, N'FRD_VICTIM_ASSISTED_FRAUD', 1, N'Victim-Assisted Fraud' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 978, N'FRD_WHITELISTED', 1, N'Whitelisted' )
INSERT [dbo].[wrap_up_code_category] ([id], [i3_name], [active], [display_name])
VALUES ( 979, N'FRD_BLACKLISTED', 1, N'Blacklisted' )
SET IDENTITY_INSERT [dbo].[wrap_up_code_category] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_activating_merchant_merchant_id]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[activating_merchant]
    ADD CONSTRAINT [uk_activating_merchant_merchant_id] UNIQUE NONCLUSTERED
    (
        [merchant_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_cca_group_display_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_group]
    ADD CONSTRAINT [uk_cca_group_display_name] UNIQUE NONCLUSTERED
    (
        [display_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_cca_group_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_group]
    ADD CONSTRAINT [uk_cca_group_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_cca_limit_display_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_limit]
    ADD CONSTRAINT [uk_cca_limit_display_name] UNIQUE NONCLUSTERED
    (
        [display_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_cca_limit_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_limit]
    ADD CONSTRAINT [uk_cca_limit_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_cca_property_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_property]
    ADD CONSTRAINT [uk_cca_property_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_cca_role_display_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_role]
    ADD CONSTRAINT [uk_cca_role_display_name] UNIQUE NONCLUSTERED
    (
        [display_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_cca_role_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_role]
    ADD CONSTRAINT [uk_cca_role_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
/****** Object:  Index [uk_cca_session_autowrap_session_id]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_session_autowrap]
    ADD CONSTRAINT [uk_cca_session_autowrap_session_id] UNIQUE NONCLUSTERED
    (
        [session_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [cca_user_UC]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[cca_user]
    ADD CONSTRAINT [cca_user_UC] UNIQUE NONCLUSTERED
    (
        [username] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
/****** Object:  Index [uk_customer_detail_session]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[customer_detail]
    ADD CONSTRAINT [uk_customer_detail_session] UNIQUE NONCLUSTERED
    (
        [session_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
/****** Object:  Index [uk_disputed_card_detail_session]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[disputed_card_detail]
    ADD CONSTRAINT [uk_disputed_card_detail_session] UNIQUE NONCLUSTERED
    (
        [session_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_disputed_card_tag_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[disputed_card_tag]
    ADD CONSTRAINT [uk_disputed_card_tag_name] UNIQUE NONCLUSTERED
    (
        [name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_gc_request_x95_code_request_code]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[gc_request]
    ADD CONSTRAINT [uk_gc_request_x95_code_request_code] UNIQUE NONCLUSTERED
    (
        [x95_code] ASC,
        [request_code] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [gc_response_response_code_key]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[gc_response]
    ADD CONSTRAINT [gc_response_response_code_key] UNIQUE NONCLUSTERED
    (
        [response_code] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_identifier_composite]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[identifier]
    ADD CONSTRAINT [uk_identifier_composite] UNIQUE NONCLUSTERED
    (
        [identifier] ASC,
        [identifier_type] ASC,
        [platform] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
/****** Object:  Index [uk_law_enforcement_detail_session]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[law_enforcement_detail]
    ADD CONSTRAINT [uk_law_enforcement_detail_session] UNIQUE NONCLUSTERED
    (
        [session_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
/****** Object:  Index [uk_merchant_detail_session]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[merchant_detail]
    ADD CONSTRAINT [uk_merchant_detail_session] UNIQUE NONCLUSTERED
    (
        [session_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [op_code_code_key]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[op_code]
    ADD CONSTRAINT [op_code_code_key] UNIQUE NONCLUSTERED
    (
        [code] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_partner_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[partner]
    ADD CONSTRAINT [uk_partner_name] UNIQUE NONCLUSTERED
    (
        [name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_permission_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[permission]
    ADD CONSTRAINT [uk_permission_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_permission_category_display_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[permission_category]
    ADD CONSTRAINT [uk_permission_category_display_name] UNIQUE NONCLUSTERED
    (
        [display_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_permission_category_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[permission_category]
    ADD CONSTRAINT [uk_permission_category_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
/****** Object:  Index [uk_refund_request_detail_session]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[refund_request_detail]
    ADD CONSTRAINT [uk_refund_request_detail_session] UNIQUE NONCLUSTERED
    (
        [session_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_report_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[report]
    ADD CONSTRAINT [unique_report_name] UNIQUE NONCLUSTERED
    (
        [name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_session_queue_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[session_queue]
    ADD CONSTRAINT [uk_session_queue_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_session_queue_session_type]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[session_queue_session_type]
    ADD CONSTRAINT [uk_session_queue_session_type] UNIQUE NONCLUSTERED
    (
        [session_queue_id] ASC,
        [session_type] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_short_pay_location_id]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[short_pay]
    ADD CONSTRAINT [uk_short_pay_location_id] UNIQUE NONCLUSTERED
    (
        [location_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_short_pay_merchant_id]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[short_pay]
    ADD CONSTRAINT [uk_short_pay_merchant_id] UNIQUE NONCLUSTERED
    (
        [merchant_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_short_pay_terminal_id]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[short_pay]
    ADD CONSTRAINT [uk_short_pay_terminal_id] UNIQUE NONCLUSTERED
    (
        [terminal_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_team_system_name]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[team]
    ADD CONSTRAINT [uk_team_system_name] UNIQUE NONCLUSTERED
    (
        [system_name] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_troubleshooting_session_connector_connectee]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[troubleshooting_session]
    ADD CONSTRAINT [uk_troubleshooting_session_connector_connectee] UNIQUE NONCLUSTERED
    (
        [connector] ASC,
        [connectee] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_vms_product_code_partner_code]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[vms_product_code]
    ADD CONSTRAINT [uk_vms_product_code_partner_code] UNIQUE NONCLUSTERED
    (
        [partner_id] ASC,
        [code] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_vms_prdouct_type_vms_product_code_vms_id]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[vms_product_type]
    ADD CONSTRAINT [uk_vms_prdouct_type_vms_product_code_vms_id] UNIQUE NONCLUSTERED
    (
        [vms_product_code_id] ASC,
        [vms_id] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uk_wizard_messages]    Script Date: 12/8/2017 2:58:50 PM ******/
ALTER TABLE [dbo].[wizard_message]
    ADD CONSTRAINT [uk_wizard_messages] UNIQUE NONCLUSTERED
    (
        [wizard_key] ASC,
        [message_type] ASC,
        [page] ASC
    )
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
    ON [PRIMARY]
GO
ALTER TABLE [dbo].[audit_activity]
    ADD DEFAULT ( ( 0 ) ) FOR [is_encrypted]
GO
ALTER TABLE [dbo].[c2c_request]
    ADD CONSTRAINT [DF__c2c_reque__trans__498EEC8D] DEFAULT ( ( 4.95 ) ) FOR [transfer_fee]
GO
ALTER TABLE [dbo].[cca_group]
    ADD DEFAULT ( ( 1 ) ) FOR [active]
GO
ALTER TABLE [dbo].[cca_group]
    ADD DEFAULT ( ( 0 ) ) FOR [locked]
GO
ALTER TABLE [dbo].[cca_group]
    ADD DEFAULT ( getdate ( ) ) FOR [created_date]
GO
ALTER TABLE [dbo].[cca_group]
    ADD DEFAULT ( getdate ( ) ) FOR [modified_date]
GO
ALTER TABLE [dbo].[cca_role]
    ADD DEFAULT ( ( 1 ) ) FOR [active]
GO
ALTER TABLE [dbo].[cca_role]
    ADD DEFAULT ( ( 0 ) ) FOR [locked]
GO
ALTER TABLE [dbo].[cca_role]
    ADD DEFAULT ( getdate ( ) ) FOR [created_date]
GO
ALTER TABLE [dbo].[cca_role]
    ADD DEFAULT ( getdate ( ) ) FOR [modified_date]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( ( 0 ) ) FOR [active]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( ( 0 ) ) FOR [pref_show_billable_only]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( 'INCOMM' ) FOR [pref_default_data_source]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( getdate ( ) ) FOR [created_date]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( getdate ( ) ) FOR [modified_date]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( 'CARD' ) FOR [pref_session_mode]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( 'UNPINNED' ) FOR [pref_dock_mode]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( 'FASTCARD' ) FOR [pref_default_search_type]
GO
ALTER TABLE [dbo].[cca_user]
    ADD DEFAULT ( 'LEFT' ) FOR [pref_summary_mode]
GO
ALTER TABLE [dbo].[op_code]
    ADD DEFAULT ( 'Other' ) FOR [request_value]
GO
ALTER TABLE [dbo].[op_code]
    ADD DEFAULT ( 'Other' ) FOR [response_value]
GO
ALTER TABLE [dbo].[permission]
    ADD DEFAULT ( ( 0 ) ) FOR [active]
GO
ALTER TABLE [dbo].[permission]
    ADD DEFAULT ( getdate ( ) ) FOR [created_date]
GO
ALTER TABLE [dbo].[permission]
    ADD DEFAULT ( getdate ( ) ) FOR [modified_date]
GO
ALTER TABLE [dbo].[permission_category]
    ADD DEFAULT ( ( 0 ) ) FOR [locked]
GO
ALTER TABLE [dbo].[permission_category]
    ADD DEFAULT ( getdate ( ) ) FOR [created_date]
GO
ALTER TABLE [dbo].[permission_category]
    ADD DEFAULT ( getdate ( ) ) FOR [modified_date]
GO
ALTER TABLE [dbo].[report]
    ADD DEFAULT ( ( 1 ) ) FOR [status]
GO
ALTER TABLE [dbo].[report]
    ADD DEFAULT ( ( 1 ) ) FOR [override]
GO
ALTER TABLE [dbo].[session_queue]
    ADD CONSTRAINT [DF__session_q__activ__160F4887] DEFAULT ( ( 1 ) ) FOR [active]
GO
ALTER TABLE [dbo].[session_queue]
    ADD CONSTRAINT [DF__session_q__autow__17036CC0] DEFAULT ( ( 30000 ) ) FOR [autowrap_time]
GO
ALTER TABLE [dbo].[session_queue]
    ADD CONSTRAINT [DF__session_q__autoc__17F790F9] DEFAULT ( ( 0 ) ) FOR [autoclose]
GO
ALTER TABLE [dbo].[vms_product_type]
    ADD DEFAULT ( ( 0 ) ) FOR [enabled]
GO
ALTER TABLE [dbo].[wrap_up_code]
    ADD DEFAULT ( ( 1 ) ) FOR [active]
GO
ALTER TABLE [dbo].[wrap_up_code]
    ADD DEFAULT ( ( 0 ) ) FOR [locked]
GO
ALTER TABLE [dbo].[wrap_up_code_category]
    ADD DEFAULT ( ( 1 ) ) FOR [active]
GO
ALTER TABLE [dbo].[audit_activity]
    WITH NOCHECK ADD CONSTRAINT [fk_audit_activity_user] FOREIGN KEY ([user_id])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[audit_activity]
    CHECK CONSTRAINT [fk_audit_activity_user]
GO
ALTER TABLE [dbo].[balance_adjustment_limit]
    WITH NOCHECK ADD CONSTRAINT [fk_balance_adjustment_limit_limit] FOREIGN KEY ([limit_id])
REFERENCES [dbo].[cca_limit] ([id])
GO
ALTER TABLE [dbo].[balance_adjustment_limit]
    CHECK CONSTRAINT [fk_balance_adjustment_limit_limit]
GO
ALTER TABLE [dbo].[balance_adjustment_limit]
    WITH NOCHECK ADD CONSTRAINT [fk_balance_adjustment_limit_permission] FOREIGN KEY ([permission_id])
REFERENCES [dbo].[permission] ([id])
GO
ALTER TABLE [dbo].[balance_adjustment_limit]
    CHECK CONSTRAINT [fk_balance_adjustment_limit_permission]
GO
ALTER TABLE [dbo].[c2c_request]
    WITH CHECK ADD CONSTRAINT [fk_c2c_request_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[c2c_request]
    CHECK CONSTRAINT [fk_c2c_request_created_by]
GO
ALTER TABLE [dbo].[c2c_request]
    WITH CHECK ADD CONSTRAINT [fk_c2c_request_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[c2c_request]
    CHECK CONSTRAINT [fk_c2c_request_modified_by]
GO
ALTER TABLE [dbo].[c2c_request]
    WITH CHECK ADD CONSTRAINT [fk_c2c_request_selection_id] FOREIGN KEY ([selection_id])
REFERENCES [dbo].[selection] ([id])
GO
ALTER TABLE [dbo].[c2c_request]
    CHECK CONSTRAINT [fk_c2c_request_selection_id]
GO
ALTER TABLE [dbo].[c2c_request]
    WITH CHECK ADD CONSTRAINT [fk_c2c_request_session_id] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[c2c_request]
    CHECK CONSTRAINT [fk_c2c_request_session_id]
GO
ALTER TABLE [dbo].[call_detail]
    WITH CHECK ADD CONSTRAINT [fk_call_detail_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[call_detail]
    CHECK CONSTRAINT [fk_call_detail_session]
GO
ALTER TABLE [dbo].[call_detail]
    WITH CHECK ADD CONSTRAINT [fk_call_detail_user] FOREIGN KEY ([user_id])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[call_detail]
    CHECK CONSTRAINT [fk_call_detail_user]
GO
ALTER TABLE [dbo].[cca_group]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_group_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_group]
    CHECK CONSTRAINT [fk_cca_group_created_by]
GO
ALTER TABLE [dbo].[cca_group]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_group_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_group]
    CHECK CONSTRAINT [fk_cca_group_modified_by]
GO
ALTER TABLE [dbo].[cca_group_owner]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_group_owner_group_id] FOREIGN KEY ([group_id])
REFERENCES [dbo].[cca_group] ([id])
GO
ALTER TABLE [dbo].[cca_group_owner]
    CHECK CONSTRAINT [fk_cca_group_owner_group_id]
GO
ALTER TABLE [dbo].[cca_group_owner]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_group_owner_user_id] FOREIGN KEY ([user_id])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_group_owner]
    CHECK CONSTRAINT [fk_cca_group_owner_user_id]
GO
ALTER TABLE [dbo].[cca_group_permission]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_group_permission_group_id] FOREIGN KEY ([group_id])
REFERENCES [dbo].[cca_group] ([id])
GO
ALTER TABLE [dbo].[cca_group_permission]
    CHECK CONSTRAINT [fk_cca_group_permission_group_id]
GO
ALTER TABLE [dbo].[cca_group_permission]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_group_permission_permission_id] FOREIGN KEY ([permission_id])
REFERENCES [dbo].[permission] ([id])
GO
ALTER TABLE [dbo].[cca_group_permission]
    CHECK CONSTRAINT [fk_cca_group_permission_permission_id]
GO
ALTER TABLE [dbo].[cca_role]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_role]
    CHECK CONSTRAINT [fk_cca_role_created_by]
GO
ALTER TABLE [dbo].[cca_role]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_group_id] FOREIGN KEY ([group_id])
REFERENCES [dbo].[cca_group] ([id])
GO
ALTER TABLE [dbo].[cca_role]
    CHECK CONSTRAINT [fk_cca_role_group_id]
GO
ALTER TABLE [dbo].[cca_role]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_role]
    CHECK CONSTRAINT [fk_cca_role_modified_by]
GO
ALTER TABLE [dbo].[cca_role_admin]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_admin_role_id] FOREIGN KEY ([role_id])
REFERENCES [dbo].[cca_role] ([id])
GO
ALTER TABLE [dbo].[cca_role_admin]
    CHECK CONSTRAINT [fk_cca_role_admin_role_id]
GO
ALTER TABLE [dbo].[cca_role_admin]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_admin_user_id] FOREIGN KEY ([user_id])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_role_admin]
    CHECK CONSTRAINT [fk_cca_role_admin_user_id]
GO
ALTER TABLE [dbo].[cca_role_member]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_member_role_id] FOREIGN KEY ([role_id])
REFERENCES [dbo].[cca_role] ([id])
GO
ALTER TABLE [dbo].[cca_role_member]
    CHECK CONSTRAINT [fk_cca_role_member_role_id]
GO
ALTER TABLE [dbo].[cca_role_member]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_member_user_id] FOREIGN KEY ([user_id])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_role_member]
    CHECK CONSTRAINT [fk_cca_role_member_user_id]
GO
ALTER TABLE [dbo].[cca_role_permission]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_permission_permission_id] FOREIGN KEY ([permission_id])
REFERENCES [dbo].[permission] ([id])
GO
ALTER TABLE [dbo].[cca_role_permission]
    CHECK CONSTRAINT [fk_cca_role_permission_permission_id]
GO
ALTER TABLE [dbo].[cca_role_permission]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_role_permission_role_id] FOREIGN KEY ([role_id])
REFERENCES [dbo].[cca_role] ([id])
GO
ALTER TABLE [dbo].[cca_role_permission]
    CHECK CONSTRAINT [fk_cca_role_permission_role_id]
GO
ALTER TABLE [dbo].[cca_session]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_session]
    CHECK CONSTRAINT [fk_cca_session_created_by]
GO
ALTER TABLE [dbo].[cca_session]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_session]
    CHECK CONSTRAINT [fk_cca_session_modified_by]
GO
ALTER TABLE [dbo].[cca_session]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_note] FOREIGN KEY ([note_id])
REFERENCES [dbo].[comment] ([id])
GO
ALTER TABLE [dbo].[cca_session]
    CHECK CONSTRAINT [fk_cca_session_note]
GO
ALTER TABLE [dbo].[cca_session]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_session_queue] FOREIGN KEY ([session_queue_id])
REFERENCES [dbo].[session_queue] ([id])
GO
ALTER TABLE [dbo].[cca_session]
    CHECK CONSTRAINT [fk_cca_session_session_queue]
GO
ALTER TABLE [dbo].[cca_session]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_user] FOREIGN KEY ([user_id])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_session]
    CHECK CONSTRAINT [fk_cca_session_user]
GO
ALTER TABLE [dbo].[cca_session]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_wrap_up_code] FOREIGN KEY ([wrap_up_code_id])
REFERENCES [dbo].[wrap_up_code] ([id])
GO
ALTER TABLE [dbo].[cca_session]
    CHECK CONSTRAINT [fk_cca_session_wrap_up_code]
GO
ALTER TABLE [dbo].[cca_session]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_wrap_up_code_category] FOREIGN KEY ([wrap_up_code_category_id])
REFERENCES [dbo].[wrap_up_code_category] ([id])
GO
ALTER TABLE [dbo].[cca_session]
    CHECK CONSTRAINT [fk_cca_session_wrap_up_code_category]
GO
ALTER TABLE [dbo].[cca_session_autowrap]
    WITH CHECK ADD CONSTRAINT [fk_cca_session_autowrap_session_id] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[cca_session_autowrap]
    CHECK CONSTRAINT [fk_cca_session_autowrap_session_id]
GO
ALTER TABLE [dbo].[cca_user]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_user_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_user]
    CHECK CONSTRAINT [fk_cca_user_created_by]
GO
ALTER TABLE [dbo].[cca_user]
    WITH NOCHECK ADD CONSTRAINT [fk_cca_user_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[cca_user]
    CHECK CONSTRAINT [fk_cca_user_modified_by]
GO
ALTER TABLE [dbo].[cca_user]
    WITH NOCHECK ADD CONSTRAINT [fk_default_partner_id] FOREIGN KEY ([default_partner_id])
REFERENCES [dbo].[partner] ([id])
GO
ALTER TABLE [dbo].[cca_user]
    CHECK CONSTRAINT [fk_default_partner_id]
GO
ALTER TABLE [dbo].[comment]
    WITH CHECK ADD CONSTRAINT [fk_comment_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[comment]
    CHECK CONSTRAINT [fk_comment_created_by]
GO
ALTER TABLE [dbo].[comment]
    WITH CHECK ADD CONSTRAINT [fk_comment_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[comment]
    CHECK CONSTRAINT [fk_comment_modified_by]
GO
ALTER TABLE [dbo].[customer_detail]
    WITH CHECK ADD CONSTRAINT [fk_customer_detail_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[customer_detail]
    CHECK CONSTRAINT [fk_customer_detail_session]
GO
ALTER TABLE [dbo].[detail_dispute]
    WITH CHECK ADD CONSTRAINT [fk_detail_dispute_identifier] FOREIGN KEY ([identifier_id])
REFERENCES [dbo].[identifier] ([id])
GO
ALTER TABLE [dbo].[detail_dispute]
    CHECK CONSTRAINT [fk_detail_dispute_identifier]
GO
ALTER TABLE [dbo].[detail_dispute_transaction]
    WITH CHECK ADD CONSTRAINT [fk_detail_dispute_transaction_detail_dispute] FOREIGN KEY ([detail_dispute_id])
REFERENCES [dbo].[detail_dispute] ([id])
GO
ALTER TABLE [dbo].[detail_dispute_transaction]
    CHECK CONSTRAINT [fk_detail_dispute_transaction_detail_dispute]
GO
ALTER TABLE [dbo].[disputed_card_detail]
    WITH CHECK ADD CONSTRAINT [fk_disputed_card_detail_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[disputed_card_detail]
    CHECK CONSTRAINT [fk_disputed_card_detail_session]
GO
ALTER TABLE [dbo].[disputed_card_item_detail]
    WITH CHECK ADD CONSTRAINT [fk_disputed_card_item_detail_disputed_card] FOREIGN KEY ([disputed_card_detail_id])
REFERENCES [dbo].[disputed_card_detail] ([id])
GO
ALTER TABLE [dbo].[disputed_card_item_detail]
    CHECK CONSTRAINT [fk_disputed_card_item_detail_disputed_card]
GO
ALTER TABLE [dbo].[identifier_comment]
    WITH NOCHECK ADD CONSTRAINT [fk_identifier_comment_comment] FOREIGN KEY ([comment_id])
REFERENCES [dbo].[comment] ([id])
GO
ALTER TABLE [dbo].[identifier_comment]
    CHECK CONSTRAINT [fk_identifier_comment_comment]
GO
ALTER TABLE [dbo].[identifier_comment]
    WITH NOCHECK ADD CONSTRAINT [fk_identifier_comment_identifier] FOREIGN KEY ([identifier_id])
REFERENCES [dbo].[identifier] ([id])
GO
ALTER TABLE [dbo].[identifier_comment]
    CHECK CONSTRAINT [fk_identifier_comment_identifier]
GO
ALTER TABLE [dbo].[law_enforcement_detail]
    WITH CHECK ADD CONSTRAINT [fk_law_enforcement_detail_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[law_enforcement_detail]
    CHECK CONSTRAINT [fk_law_enforcement_detail_session]
GO
ALTER TABLE [dbo].[merchant_detail]
    WITH CHECK ADD CONSTRAINT [fk_merchant_detail_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[merchant_detail]
    CHECK CONSTRAINT [fk_merchant_detail_session]
GO
ALTER TABLE [dbo].[partner]
    WITH NOCHECK ADD CONSTRAINT [fk_partner_permission] FOREIGN KEY ([permission_id])
REFERENCES [dbo].[permission] ([id])
GO
ALTER TABLE [dbo].[partner]
    CHECK CONSTRAINT [fk_partner_permission]
GO
ALTER TABLE [dbo].[permission]
    WITH NOCHECK ADD CONSTRAINT [fk_permission_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[permission]
    CHECK CONSTRAINT [fk_permission_created_by]
GO
ALTER TABLE [dbo].[permission]
    WITH NOCHECK ADD CONSTRAINT [fk_permission_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[permission]
    CHECK CONSTRAINT [fk_permission_modified_by]
GO
ALTER TABLE [dbo].[permission]
    WITH NOCHECK ADD CONSTRAINT [fk_permission_permission_category] FOREIGN KEY ([permission_category_id])
REFERENCES [dbo].[permission_category] ([id])
GO
ALTER TABLE [dbo].[permission]
    CHECK CONSTRAINT [fk_permission_permission_category]
GO
ALTER TABLE [dbo].[permission_category]
    WITH NOCHECK ADD CONSTRAINT [fk_permission_category_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[permission_category]
    CHECK CONSTRAINT [fk_permission_category_created_by]
GO
ALTER TABLE [dbo].[permission_category]
    WITH NOCHECK ADD CONSTRAINT [fk_permission_category_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[permission_category]
    CHECK CONSTRAINT [fk_permission_category_modified_by]
GO
ALTER TABLE [dbo].[queue_wrap_up_code_category]
    WITH NOCHECK ADD CONSTRAINT [fk_queue_wrap_up_code_category_queue_id] FOREIGN KEY ([queue_id])
REFERENCES [dbo].[session_queue] ([id])
GO
ALTER TABLE [dbo].[queue_wrap_up_code_category]
    CHECK CONSTRAINT [fk_queue_wrap_up_code_category_queue_id]
GO
ALTER TABLE [dbo].[queue_wrap_up_code_category]
    WITH NOCHECK ADD CONSTRAINT [fk_queue_wrap_up_code_category_wrap_up_code_category_id] FOREIGN KEY ([wrap_up_code_category_id])
REFERENCES [dbo].[wrap_up_code_category] ([id])
GO
ALTER TABLE [dbo].[queue_wrap_up_code_category]
    CHECK CONSTRAINT [fk_queue_wrap_up_code_category_wrap_up_code_category_id]
GO
ALTER TABLE [dbo].[receipt_card_detail]
    WITH CHECK ADD CONSTRAINT [fk_receipt_card_detail_id] FOREIGN KEY ([receipt_detail_id])
REFERENCES [dbo].[receipt_detail] ([id])
GO
ALTER TABLE [dbo].[receipt_card_detail]
    CHECK CONSTRAINT [fk_receipt_card_detail_id]
GO
ALTER TABLE [dbo].[receipt_detail]
    WITH CHECK ADD CONSTRAINT [fk_receipt_detail] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[receipt_detail]
    CHECK CONSTRAINT [fk_receipt_detail]
GO
ALTER TABLE [dbo].[receipt_detail]
    WITH CHECK ADD CONSTRAINT [fk_receipt_detail_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[receipt_detail]
    CHECK CONSTRAINT [fk_receipt_detail_session]
GO
ALTER TABLE [dbo].[refund_request_detail]
    WITH CHECK ADD CONSTRAINT [fk_refund_request_detail_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[refund_request_detail]
    CHECK CONSTRAINT [fk_refund_request_detail_session]
GO
ALTER TABLE [dbo].[report_role]
    WITH NOCHECK ADD CONSTRAINT [fk_report_role_report_id] FOREIGN KEY ([report_id])
REFERENCES [dbo].[report] ([id])
GO
ALTER TABLE [dbo].[report_role]
    CHECK CONSTRAINT [fk_report_role_report_id]
GO
ALTER TABLE [dbo].[report_role]
    WITH NOCHECK ADD CONSTRAINT [fk_report_role_role_id] FOREIGN KEY ([role_id])
REFERENCES [dbo].[cca_role] ([id])
GO
ALTER TABLE [dbo].[report_role]
    CHECK CONSTRAINT [fk_report_role_role_id]
GO
ALTER TABLE [dbo].[selection]
    WITH CHECK ADD CONSTRAINT [fk_selection_partner] FOREIGN KEY ([partner_id])
REFERENCES [dbo].[partner] ([id])
GO
ALTER TABLE [dbo].[selection]
    CHECK CONSTRAINT [fk_selection_partner]
GO
ALTER TABLE [dbo].[selection]
    WITH CHECK ADD CONSTRAINT [fk_selection_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[selection]
    CHECK CONSTRAINT [fk_selection_session]
GO
ALTER TABLE [dbo].[selection_identifier]
    WITH NOCHECK ADD CONSTRAINT [fk_selection_identifier_identifier] FOREIGN KEY ([identifier_id])
REFERENCES [dbo].[identifier] ([id])
GO
ALTER TABLE [dbo].[selection_identifier]
    CHECK CONSTRAINT [fk_selection_identifier_identifier]
GO
ALTER TABLE [dbo].[selection_identifier]
    WITH CHECK ADD CONSTRAINT [fk_selection_identifier_selection] FOREIGN KEY ([selection_id])
REFERENCES [dbo].[selection] ([id])
GO
ALTER TABLE [dbo].[selection_identifier]
    CHECK CONSTRAINT [fk_selection_identifier_selection]
GO
ALTER TABLE [dbo].[session_comment]
    WITH CHECK ADD CONSTRAINT [fk_session_comment_comment] FOREIGN KEY ([comment_id])
REFERENCES [dbo].[comment] ([id])
GO
ALTER TABLE [dbo].[session_comment]
    CHECK CONSTRAINT [fk_session_comment_comment]
GO
ALTER TABLE [dbo].[session_comment]
    WITH CHECK ADD CONSTRAINT [fk_session_comment_session] FOREIGN KEY ([session_id])
REFERENCES [dbo].[cca_session] ([id])
GO
ALTER TABLE [dbo].[session_comment]
    CHECK CONSTRAINT [fk_session_comment_session]
GO
ALTER TABLE [dbo].[session_queue]
    WITH NOCHECK ADD CONSTRAINT [fk_session_queue_permission] FOREIGN KEY ([permission_id])
REFERENCES [dbo].[permission] ([id])
GO
ALTER TABLE [dbo].[session_queue]
    CHECK CONSTRAINT [fk_session_queue_permission]
GO
ALTER TABLE [dbo].[team]
    WITH CHECK ADD CONSTRAINT [fk_team_created_by] FOREIGN KEY ([created_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[team]
    CHECK CONSTRAINT [fk_team_created_by]
GO
ALTER TABLE [dbo].[team]
    WITH CHECK ADD CONSTRAINT [fk_team_modified_by] FOREIGN KEY ([modified_by])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[team]
    CHECK CONSTRAINT [fk_team_modified_by]
GO
ALTER TABLE [dbo].[team_member]
    WITH CHECK ADD CONSTRAINT [fk_team_team] FOREIGN KEY ([team_id])
REFERENCES [dbo].[team] ([id])
GO
ALTER TABLE [dbo].[team_member]
    CHECK CONSTRAINT [fk_team_team]
GO
ALTER TABLE [dbo].[team_member]
    WITH CHECK ADD CONSTRAINT [fk_team_user] FOREIGN KEY ([user_id])
REFERENCES [dbo].[cca_user] ([id])
GO
ALTER TABLE [dbo].[team_member]
    CHECK CONSTRAINT [fk_team_user]
GO
ALTER TABLE [dbo].[vms_product_type]
    WITH CHECK ADD CONSTRAINT [fk_vms_product_type_vms_product_code] FOREIGN KEY ([vms_product_code_id])
REFERENCES [dbo].[vms_product_code] ([id])
GO
ALTER TABLE [dbo].[vms_product_type]
    CHECK CONSTRAINT [fk_vms_product_type_vms_product_code]
GO
ALTER TABLE [dbo].[wrap_up_code]
    WITH NOCHECK ADD CONSTRAINT [fk_wrap_up_code_wrap_up_code_category_id] FOREIGN KEY ([wrap_up_code_category_id])
REFERENCES [dbo].[wrap_up_code_category] ([id])
GO
ALTER TABLE [dbo].[wrap_up_code]
    CHECK CONSTRAINT [fk_wrap_up_code_wrap_up_code_category_id]
GO
ALTER TABLE [dbo].[cca_group]
    WITH NOCHECK ADD CONSTRAINT [CK_cca_group_sys_name] CHECK (( [System_Name] = upper ( [System_Name] ) ))
GO
ALTER TABLE [dbo].[cca_group]
    CHECK CONSTRAINT [CK_cca_group_sys_name]
GO
ALTER TABLE [dbo].[cca_limit]
    WITH NOCHECK ADD CONSTRAINT [CK_cca_limit_sys_name] CHECK (( [System_Name] = upper ( [System_Name] ) ))
GO
ALTER TABLE [dbo].[cca_limit]
    CHECK CONSTRAINT [CK_cca_limit_sys_name]
GO
ALTER TABLE [dbo].[cca_role]
    WITH NOCHECK ADD CONSTRAINT [CK_cca_role_sys_name] CHECK (( [System_Name] = upper ( [System_Name] ) ))
GO
ALTER TABLE [dbo].[cca_role]
    CHECK CONSTRAINT [CK_cca_role_sys_name]
GO
/****** Object:  StoredProcedure [dbo].[add_permission]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[add_permission]

        @systemName       VARCHAR(64),
        @displayName      VARCHAR(64),
        @descriptionValue VARCHAR(512)

AS

    INSERT INTO permission (
        system_name,
        display_name,
        description,
        permission_category_id,
        active,
        created_date,
        created_by,
        modified_date,
        modified_by
    )
    VALUES (
        @systemName,
        @displayName,
        @descriptionValue,
        (
            SELECT id
            FROM permission_category
            WHERE system_name = 'UNCATEGORIZED' ),
        'TRUE',
        getdate ( ),
        (
            SELECT id
            FROM cca_user
            WHERE username = 'cca_admin' ),
        getdate ( ),
        (
            SELECT id
            FROM cca_user
            WHERE username = 'cca_admin' )
    );

    INSERT INTO cca_group_permission (
        group_id,
        permission_id
    )
    VALUES (
        (
            SELECT id
            FROM cca_group
            WHERE system_name = 'SYSTEM_ADMINISTRATION' ),
        ( @@IDENTITY )
    );

GO
/****** Object:  StoredProcedure [dbo].[default_wizard_messages]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[default_wizard_messages]

        @wizardKey VARCHAR(64),
        @page      INT

AS

    INSERT INTO wizard_message (wizard_key, page, message_type, message) VALUES
        ( @wizardKey, @page, 'TITLE', '' ),
        ( @wizardKey, @page, 'SHORT_TITLE', '' ),
        ( @wizardKey, @page, 'HEADER', '' ),
        ( @wizardKey, @page, 'SUBHEADER', '' ),
        ( @wizardKey, @page, 'INSTRUCTIONS', '' ),
        ( @wizardKey, @page, 'ALERT', '' ),
        ( @wizardKey, @page, 'FOOTER', '' );
    ;
GO
/****** Object:  StoredProcedure [dbo].[set_wizard_message]    Script Date: 12/8/2017 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[set_wizard_message]

        @wizardKey      VARCHAR(64),
        @messageType    VARCHAR(64),
        @page           INT,
        @message        TEXT = NULL,
        @failureMessage TEXT = NULL

AS
    UPDATE wizard_message
    SET message         = @message,
        failure_message = @failureMessage
    WHERE wizard_key = @wizardKey
          AND message_type = @messageType
          AND page = @page;
    ;
GO

CREATE NONCLUSTERED INDEX idx_cca_session_user_id_status
    ON cca_session (user_id, status) INCLUDE (id, created_date, session_queue_id, closed_date, session_class, session_type, created_by, modified_date, modified_by);