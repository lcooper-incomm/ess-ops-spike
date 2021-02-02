SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[serve_file_upload] (
    [id]          [BIGINT] IDENTITY (1, 1) NOT NULL,
    [account_id] [BIGINT]                 NOT NULL,
    [upload_date] [DATETIME2](6)           NULL,
    [hash_code]   [VARCHAR](256)           NULL,
    CONSTRAINT [serve_file_upload_id_primary_key] PRIMARY KEY CLUSTERED
        (
            [id] ASC
        )
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
) ON [PRIMARY]
GO