import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="chapter">
      <div>
        <div class="about-grid">
          <div class="head">
            <h2>About CaretEDA</h2>
            <p>Founded by a team with deep roots in EDA, AI and silicon engineering. Headquartered in Campbell, California.</p>
          </div>

          <div class="about-body">
            <p class="first">
              Built for semiconductor engineering teams who need to compress tapeout timelines, our
              Spec-to-Netlist™ flow integrates open-source and commercial EDA tools without locking you
              into a proprietary stack.
            </p>
            <p>
              The semiconductor industry is at an inflection point. Design complexity has outpaced the ability
              of engineering teams to scale. Tapeout cycles that once stretched months are now expected to
              compress, while first-pass success rates must improve at the same time.
            </p>
            <p>
              Our platform delivers an AI-native design environment that acts as a force multiplier for scarce
              engineering talent. It handles specification interpretation, RTL generation, verification planning
              and netlist refinement within a single, auditable flow.
            </p>
            <p>
              Our <strong class="text-ink">Tool Optionality</strong> pillar means we integrate with the tools
              your team already uses, whether open-source (Verilator, OpenROAD, Yosys) or commercial, rather
              than forcing a proprietary lock-in. CaretEDA sits on top of your existing toolchain.
            </p>
            <p>
              Engineering talent is distributed globally. CaretEDA is backed by decades of combined EDA experience
              and is a member of several startup and partner programs at leading cloud and AI companies.
            </p>
          </div>
        </div>

        <div class="stats">
          <div><b>40%</b><p>Design cycle compression seen in early evaluations</p></div>
          <div><b>$775B</b><p>Global semiconductor market driving AI-native design</p></div>
          <div><b>6–8 wks</b><p>Typical evaluation-to-results timeline</p></div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
}
