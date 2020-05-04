using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FilesManager.Core.Migrations
{
    public partial class addhour : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Personal",
                nullable: false,
                defaultValue: new DateTime(2020, 4, 27, 18, 6, 16, 554, DateTimeKind.Local).AddTicks(2614),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Documents",
                nullable: false,
                defaultValue: new DateTime(2020, 4, 27, 18, 6, 16, 568, DateTimeKind.Local).AddTicks(9752),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Personal",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2020, 4, 27, 18, 6, 16, 554, DateTimeKind.Local).AddTicks(2614));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Documents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2020, 4, 27, 18, 6, 16, 568, DateTimeKind.Local).AddTicks(9752));
        }
    }
}
