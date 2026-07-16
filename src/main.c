#include <gint/display.h>
#include <gint/keyboard.h>

int main(void)
{
    const color_t bg = C_WHITE;
    const color_t text_col = C_BLACK;

    while(1) {
        dclear(bg);
        
        dtext(0, 0, text_col, "Hello World");
        
        dupdate();

        pollevent();
        if(keydown(KEY_EXIT) || keydown(KEY_MENU)) {
            break;
        }
    }

    return 0;
}
